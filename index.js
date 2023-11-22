const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const conn = require('./db/conn')
const Usuario = require('./models/Usuario')
const Produto = require('./models/Produto')

//======= models

const PORT = 3000
const hostname = 'localhost'
let log = false
let adm = false
let nomeAdm = ''
let tipoUsuario = ''
let idUsuario = Number

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
        bcrypt.compare(senha, pesq.senha, (err,compativel)=>{
            if(err){
                console.error('Erro ao comparar a senha',err)
                msg = 'Erro, por favor tente novamente'
                res.render('login', {log, msg})
            }else if(compativel){
                if(pesq.tipo === 'adm'){
                    log = true
                    adm = true
                    nomeAdm = pesq.nome
                    idUsuario = pesq.id
                    tipoUsuario = pesq.tipo
                    res.render('adm', {log, nomeAdm, tipoUsuario, adm, idUsuario})        
                }else if(pesq.tipo === 'cliente'){
                    log = true
                    idUsuario = pesq.id
                    tipoUsuario = pesq.tipo
                    res.render('home', {log, tipoUsuario, adm, idUsuario})
                }else{
                    idUsuario = pesq.id
                    res.render('home', {log, tipoUsuario, adm, idUsuario})
                }
            }else{
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
    res.render('login', {log, id_usuario, usuario, adm})
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