<template>
    <div class="container-fluid">
        <nav class="navbar">
            <span class="navbar-brand mb-0 h1">Markdown documents</span>
        </nav>
        <div class="container-fluid main-container">
            <div class="row">
                <div class="col">
                    <h4>Список документов</h4>
                </div>
            </div>
            <div class="row r-list">
                <div class="col-md-auto pt-2">
                    <ul class="list-group list-group-flush" v-for="doc of documents">
                        <li class="list-group-item">
                            <h5>{{doc.title}} &emsp;</h5>
                            <button @click="deleteDocument(doc._id)">Удалить</button>
                            <button @click="editDocument(doc._id)">Изменить</button>
                            <h6>Дата последнего обновления {{doc.created.split("T")[0] + " " + doc.created.split(".")[0].split("T")[1]}}</h6>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="row pt-4">
                <div class="col">
                    <h4>Добавление/изменение документа</h4>
                </div>
            </div>
            <div class="row pt-4">
                <div class="col-md-6">
                    <form @submit.prevent="sendDocument">
                        <div class="form-group">
                            <input type="text" v-model="document.title" placeholder="Document name" class="form-control" required>
                        </div>
                        <div class="form-group">
                            <textarea v-model="document.description" rows="20" placeholder="Document content" class="form-control"></textarea>
                         </div>
                        <template v-if="edit === false">
                            <button>Добавить</button>
                         </template>
                        <template v-else>
                            <button>Обновить</button>
                        </template>
                    </form>
                </div>
                <div class="col-md-6 pt-2 md-div" v-html="compiledMarkdown" style="border: 1px solid #ced4da; border-radius: .25rem"></div>
            </div>
        </div>
    </div>
</template>

<script>
    class Document{
        constructor(title, description){
            this.title = title;
            this.description = description;
            this.created = new Date();
        }
    }

    export default {
        name: "App",
        data(){
            return{
                document: new Document(),
                documents: [],
                edit: false,
                documentToEdit: '',
            }
        },
        computed: {
            compiledMarkdown: function () {
                return marked(this.document.description || '', { sanitize: true })
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
