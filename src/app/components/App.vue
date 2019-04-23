<template>
    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">Markdown documents</a>
        </nav>

        <div class="container">
            <div class="row pt-5">
                <div class="col-md-5">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="addDocument">
                                <div class="form-group">
                                    <input type="text" v-model="document.title" placeholder="Document name" class="form-control">
                                </div>
                                <div class="form-group">
                                    <textarea v-model="document.description" cols="30" rows="10" placeholder="Document content" class="form-control"></textarea>
                                </div>
                                <button class="btn btn-primary btn-block">Save</button>
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
                document: new Document()
            }
        },
        methods:{
            addDocument(){
                fetch('/api/documents', {
                    method: 'POST',
                    body: JSON.stringify(this.document),
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => console.log(data));
                this.document = new Document();
            }
        }
    }
</script>

<style scoped>

</style>
