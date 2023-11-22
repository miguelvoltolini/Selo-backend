const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const conn = require('./db/conn')

//======= models

const PORT = 3000
const hostname = 'localhost'
let log = false
let adm = false
let nomeAdm = ''
tipoUsuario = ''

//========================================= config express
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static('public'))
//========================================= config handlebars
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')
//=========================================

app.post('/login', async (req,res)=>{
    const email = req.body.email
    const senha = req.body.senha
    const pesq = await Usuario.findOne({raw:true, where:{email:email}})

    if(pesq == null){
        msg = 'Usuário não cadastrado'
        res.render('login', {log, msg})
    }else{
        // comparando a senha com o uso de hash
        bcrypt.compare(senha, pesq.senha, (err,resultado)=>{
            if(err){
                console.error('Erro ao comparar a senha',err)
                res.render('login', {log})
            }else if(resultado){
                if(pesq.tipo === 'adm'){
                    log = true
                    id_usuario = pesq.id
                    usuario = pesq.nome_usuario
                    tipoUsuario = pesq.tipo
                    adm = true
                    res.render('adm', {log, id_usuario, usuario, tipoUsuario, adm})        
                }else if(pesq.tipo === 'cliente'){
                    log = true
                    id_usuario = pesq.id
                    usuario = pesq.nome_usuario
                    tipoUsuario = pesq.tipo
                    res.render('home', {log, id_usuario, usuario, tipoUsuario, adm})
                }else{
                    id_usuario = pesq.id
                    usuario = pesq.nome_usuario
                    console.log(pesq.nome_usuario)
                    res.render('home', {log, id_usuario, usuario, tipoUsuario, adm})
                }
            }else{
                console.log('senha incorreta')
                msg = 'Senha incorreta'
                res.render('login', {log, msg})
            }
        })
    }
})
app.get('/login', (req,res)=>{
    log = false
    id_usuario = Number
    usuario = ''
    res.render('login', {log, id_usuario, usuario, tipoUsuario, adm})
})


//========================================= Home

app.get('/contato', (req,res)=>{
    res.render('contato', {log})
})

app.get('/quem_somos', (req,res)=>{
    res.render('quem_somos', {log})
})

app.get('/home', (req,res)=>{
    res.render('home', {log})
})

app.get('/', (req,res)=>{
    res.render('home', {log})
})

//=========================================

conn.sync().then(()=>{
    app.listen(PORT, hostname, ()=>{
        console.log(`Servidor rodando em ${hostname}:${PORT}`)
    })
}).catch((error)=>{
    console.error('Erro de conexão'+ error)
})