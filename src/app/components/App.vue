<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">Markdown documents</a>
        </nav>

        <div class="container">
            <div class="row pt-5">
               <div class="col">
                   <table class="table table-bordered">
                       <thead>
                        <tr>
                            <th>Document</th>
                        </tr>
                       </thead>
                       <tbody>
                            <tr v-for="doc of documents">
                                <td>{{doc.title}}</td>
                                <td>
                                    <button @click="deleteDocument(doc._id)" class="btn btn-danger">Delete</button>
                                    <button @click="editDocument(doc._id)" class="btn btn-secondary">Edit</button>
                                </td>
                            </tr>
                       </tbody>
                   </table>
               </div>
            </div>
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="sendDocument">
                                <div class="form-group">
                                    <input type="text" v-model="document.title" placeholder="Document name" class="form-control">
                                </div>
                                <div class="form-group">
                                    <textarea v-model="document.description" cols="30" rows="10" placeholder="Document content" class="form-control"></textarea>
                                </div>
                                <template v-if="edit === false">
                                    <button class="btn btn-primary btn-block">Send</button>
                                </template>
                                <template v-else>
                                    <button class="btn btn-primary btn-block">Update</button>
                                </template>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    class Document{
        constructor(title, description){
            this.title = title;
            this.description = description;
        }
    }

    export default {
        name: "App",
        data(){
            return{
                document: new Document(),
                documents: [],
                edit: false,
                documentToEdit: ''
            }
        },
        created(){
            this.getDocuments()
        },
        methods:{
            sendDocument(){
                if (this.edit === false) {
                    fetch('/api/documents', {
                        method: 'POST',
                        body: JSON.stringify(this.document),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            this.getDocuments();
                        });
                } else {
                    fetch('/api/documents/' + this.documentToEdit, {
                        method: 'PUT',
                        body: JSON.stringify(this.document),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                        .then(res => res.json())
                        .then(data => {
                            this.getDocuments();
                            this.edit = false;
                        });
                }
                this.document = new Document();
            },
            getDocuments(){
                fetch('/api/documents')
                    .then(res => res.json())
                    .then(data => {
                        this.documents = data;
                        console.log(this.documents)
                    });
            },
            deleteDocument(id){
                fetch('/api/documents/' + id, {
                    method: 'DELETE',
                    headers:{
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        this.getDocuments();
                    });
            },
            editDocument(id){
                fetch('/api/documents/' + id)
                    .then(res => res.json())
                    .then(data => {
                        this.document = new Document(data.title, data.description);
                        this.documentToEdit = data._id;
                        this.edit = true;
                    })
            }
        }
    }
</script>

<style scoped>

</style>
