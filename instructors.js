const fs = require("fs")
const data = require("./data.json")

//create - exporta o post
exports.post =(req, res)=>{
    const keys = Object.keys(req.body) // transforma os dados do body(formulario) em um array

    for(key of keys){
        if(req.body[key] == "") {
            return res.send("Por favor, preenche todos os campos")
        }
    }

    let {avatar_url,birth,name,services,gender} = req.body

    birth = Date.parse(birth)
    const created_at = Date.now()
    const id = Number(data.instructors.length + 1)

    data.instructors.push({
        id,
        avatar_url,
        name,
        birth,
        gender,
        services,
        created_at
    })
    
    fs.writeFile("data.json",JSON.stringify(data,null,2),(err)=>{

        if(err) return res.send("Falha ao escrever no arquivo!")
        
        return res.redirect("/instructors")
    })

   // return res.send(req.body)
}

