<template>
  <div class="home">
    <h1>Listado de Autos </h1>
    <div >
      <el-input style="width: 350px;" v-model='marca' placeholder="Ingrese la marca del vehiculo"></el-input>
      <br>
      <el-input style="width: 350px;" v-model='modelo' placeholder="Ingrese la modelo del vehiculo"></el-input>
      <br>
      <el-button type="primary" @click="add">Agregar</el-button>
    </div>
    <div>
      <ol>
        <li v-for="(item, index) in listado" :key="index">
          <span v-show="!showEdit"> {{ item.marca }} </span>
          <span v-show="!showEdit"> {{ item.modelo }} </span>
          <el-input v-show="showEdit" v-model="newMarca" placeholder="Ingrese la nueva marca"> </el-input>
          <el-input v-show="showEdit" v-model="newModelo" placeholder="Ingrese el nuevo modelo"> </el-input>
         
          
          <el-button type="danger" icon="el-icon-delete" @click="del(item.id)"></el-button>
          <el-button v-show="!showEdit" type="info" icon="el-icon-edit" @click="showEdit =true; newMarca=item.marca; newModelo=item.modelo"></el-button>
          <el-button v-show="showEdit" type="success" icon="el-icon-circle-check" @click="update(item, newMarca, newModelo)"></el-button>
        </li>
      </ol>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'home',
  components: {
  },
  data () {
    return {
      listado: [],
      marca: '',
      modelo:'',
      showEdit: false,
      newMarca: '',
      newModelo: '',
    }
  },
  created () {
    this.get()
  },
  methods: {
    get () {
      const db = this.$firebase.db()
      db.ref('lista/vehiculo').once('value')
        .then( data => {
          this.listado = data.val()
        })
    },
    add () {
      const db = this.$firebase.db()
      const id = Math.random().toString(10).slice(2, 8)
      db.ref(`lista/vehiculo/${id}`)
        .set({ 
          marca: this.marca,
          modelo: this.modelo,
          id: id
          })
        .then( data => { 
          this.$message.success('Se agrego')          
          this.marca = ''
          this.modelo =''
          })
        .catch( error => { console.log(" Error al agregar ", error)})
      this.get()
    },
    del (id) {
      const db = this.$firebase.db()
      db.ref(`lista/vehiculo/${id}`)
        .remove()
        .then( data => {
           this.$message.success('Eliminado :)')
           console.log(data)
           })
        .catch( error => { this.$message.error('Error al eliminar :(')})
      this.get()
    },
    update (item, newMarca, newModelo) {
      // this.showEdit = true
      console.log(item.marca, newMarca, item.modelo, newModelo)
      if (item.marca !== newMarca || item.modelo !== newModelo) {
        item.marca = newMarca
        item.modelo = newModelo

        const db = this.$firebase.db()
        db.ref(`lista/vehiculo/${item.id}`)
        .set(item)
        .then( data => { 
          this.$message.success('Se Actualizo Correctamente')          
          this.marca = ''
          this.modelo = ''
          })
        .catch( error => { console.log(" Error al actualizar Item ", error)})
        
        this.showEdit = false
        this.get()
      } else {
        this.$message.success('Se Actualizo Correctamente :)') 
        this.showEdit = false
      }
    }

  }
}
</script>
