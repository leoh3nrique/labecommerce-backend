import express, {Request, Response} from "express";
import cors from "cors"
import { db } from "./database/knex";



const app = express()

app.use(express.json())

app.use(cors())

app.listen(3003, () =>{
    console.log("Rodando na porta 3003")
})


//GetAllUsers 
app.get("/users", async (req:Request, res:Response)=>{
    try{
        const result = await db("users")

        if(!result){
            res.status(400)
            throw new Error("Não existe usuários.")
        }

        res.status(200).send(result)
    
    }
    catch (error: any) {
        console.log(error);
        if (error.statusCode === 200) {
          res.status(500);
        }
        if (error instanceof Error) {
          res.send(error.message);
        } else {
          res.send("Erro inesperado");
        }
      }
})

//CreateUser
app.post("/users", async (req:Request, res:Response)=>{
    try {
        
        const id = req.body.id
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password

        //ID//////////////////
        if(id !== undefined){
            if(id.length === 0){
                res.status(400)
                throw new Error("é necessario um id")
            }
    
            const verify = await db("users").where({id:id})
            if(verify.length > 0){
                res.status(400)
                throw new Error("Id existente, tente outro valor.")
            }
        }
        ///////
        /////NAME//////
        if(name !== undefined){
            if(typeof name !== "string"){
                res.status(400)
                throw new Error("O nome deve ser do tipo string")
            }
        }
        //Email////////
        if(email !== undefined){

            const verify = await db("users").where({email:email})
            if(verify.length > 0){
                res.status(400)
                throw new Error("Email existente, tente outro valor.")
            }
           
            if(!email.includes("@")){
                res.status(400)
                throw new Error("é necessario um email válido")
            }
        }
        ///
        //Password
        if(password !== undefined){
            if(password.length < 8 || password.length > 12){
                res.status(400)
                throw new Error("Senha invalida. A senha precisa ter pelo menos 8 caracteres e no máximo 12" )
            }
    
        }
        const newUser ={
            id: id,
            name:name,
            email:email,
            password:password
        }
        await db("users").insert(newUser)
        res.status(201).send({message : "Usuario cadastrado com sucesso"})

    } catch (error: any) {
        console.log(error);
        if (error.statusCode === 200) {
          res.status(500);
        }
        if (error instanceof Error) {
          res.send(error.message);
        } else {
          res.send("Erro inesperado");
        }
      }
})

//Create Product
app.post("/products", async(req:Request, res:Response)=>{
    try {
        const id = req.body.id as string
        const name = req.body.nome as string
        const price = req.body.price as number
        const description = req.body.description as string
        const imageUrl = req.body.imageUrl as string

        //ID////
        if(id !== undefined){
            if(id.length === 0){
                res.status(400)
                throw new Error("é necessario um id")
            }
    
            const verify = await db("users").where({id:id})
            if(verify.length > 0){
                res.status(400)
                throw new Error("Id existente, tente outro valor.")
            }
        }

        //name//
        if(name !== undefined){
            if(name.length < 2){
                res.status(400)
                throw new Error("é necessario um name com mais de 2 caracteres")
            }
        }
        
        //price
        if(price !== undefined){
            if(typeof price !== "number"){
                res.status(400)
                throw new Error("insira um valor válido")
            }
            
        }
        //description
        if(description !== undefined){
            if(typeof description !== "string"){
                res.status(400)
                throw new Error("Deve ser string")
            }
        }
        //imageUrl
        if(imageUrl !== undefined){
            if(typeof imageUrl !== "string"){
                res.status(400)
                throw new Error("Deve ser string")
            }
        }

        const newProduct = {
            id:id,
            name:name,
            price:price,
            description:description,
            imageUrl:imageUrl
        }

        await db("products").insert(newProduct)
    
        res.status(201).send({message: "Produto cadastrado com sucesso"})
    
    } catch (error) {
        console.log(error)
        if(res.statusCode === 200){
            res.status(500)
        }
    }
})

//Get all products funcionalidade 1
app.get("/products", async (req:Request, res:Response)=>{
    try{
        const result = await db("products")

        if(!result){
            res.status(400)
            throw new Error("Nenhum produto encotrado.")
        }

        res.status(200).send(result)
    }catch (error: any) {
        console.log(error);
        if (error.statusCode === 200) {
          res.status(500);
        }
        if (error instanceof Error) {
          res.send(error.message);
        } else {
          res.send("Erro inesperado");
        }
      }
})

//Get all products funcionalidade 2
app.get("/products/search" , async (req:Request, res:Response)=>{
    try {
        const q = req.query.q as string

        const products =  await db
        .select("*")
        .from("products")
        .whereRaw("LOWER(name) like ?", [`%${q.toLowerCase()}%`]);

        if(products.length === 0) {
            res.status(400)
            throw new Error("Produto não encontrado")
        }
    
        res.status(200).send(products)
    
    } catch (error: any) {
        console.log(error);
        if (error.statusCode === 200) {
          res.status(500);
        }
        if (error instanceof Error) {
          res.send(error.message);
        } else {
          res.send("Erro inesperado");
        }
      }
})

//Create Purchase
app.post("/purchases", async (req:Request, res:Response)=>{
    try {
        const id = req.body.id
        const buyer_id = req.body.buyer_id
        const totalPrice = req.body.total_price
        
        //id
        if(id !== undefined){
            if(typeof id !== "string"){
                res.status(400)
                throw new Error("id deve ser string")
            }
            if(id.length < 1){
                res.status(400)
                throw new Error("Id deve ter mais de um caractere")
            }
        }
        //buyer_id
        if(buyer_id !== undefined){
            if(typeof buyer_id !== "string"){
                res.status(400)
                throw new Error("id deve ser string")
            }
            if(buyer_id.length === 0){
                res.status(400)
                throw new Error("ID invalido")
            }
        }
        //totalprice
        if(totalPrice !== undefined){
            if(typeof totalPrice !== "number"){
                res.status(400)
                throw new Error("deve ser do tipo number")
            }
        }
        
        const verify = await db("purchases").where({id:id})

        if(verify.length < 0){
            res.status(400)
            throw new Error("Id da compra já existente.")
        }else{
            await db.insert({
                id:id,
                buyer_id: buyer_id,
                total_price:totalPrice
            }).into("purchases")
        }
            
        res.status(201).send({message: "Compra cadastrada com sucesso"})
    
    } catch (error: any) {
        console.log(error);
        if (error.statusCode === 200) {
          res.status(500);
        }
        if (error instanceof Error) {
          res.send(error.message);
        } else {
          res.send("Erro inesperado");
        }
      }
})

//Delete purchase by id
app.delete("/purchases/:id", async (req:Request, res:Response)=>{
    try{
        const idToDelete = req.params.id
        const verify = await db("purchases").where({id:idToDelete})
        if(verify){
            await db("purchases").del().where({id:idToDelete})
        }else{
            res.status(400)
            throw new Error("Compra não encontrada")
        }
        res.status(200).send({message:"Compra cancelada com sucesso."})

    } catch (error: any) {
        console.log(error);
        if (error.statusCode === 200) {
          res.status(500);
        }
        if (error instanceof Error) {
          res.send(error.message);
        } else {
          res.send("Erro inesperado");
        }
      }
})

//Get purchases by id
app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
    
      const { id } = req.params;
      const verify = await db("purchases").where({
        id: id,
      });
      if (verify.length < 1) {
        res.status(400);
        throw new Error("Compra inexistente!");
      }
      const result = await db("purchases")
        .select()
        .where({
          "purchases.id": id,
        })
        .innerJoin("users", "purchases.buyer_id", "=", "users.id");
  
      const produtos = await db("purchases_products")
        .select()
        .where({
          purchase_id: id,
        })
        .innerJoin(
          "products",
          "purchases_products.product_id",
          "=",
          "products.id"
        );
  
      const compra = {
        ...result,
        produtos: produtos, 
      };
      res.status(200).send(compra);
    } catch (error: any) {
      console.log(error);
      if (error.statusCode === 200) {
        res.status(500);
      }
      if (error instanceof Error) {
        res.send(error.message);
      } else {
        res.send("Erro inesperado");
      }
    }
  });



//Edit product by id
app.put("/products/:id" , async (req:Request, res:Response)=>{
    try{
        const idToSearch = req.params.id

        const id = req.body.id as string || undefined
        const name = req.body.name as string || undefined
        const price = req.body.price as number || undefined
        const description = req.body.description as string || undefined
        const imageUrl = req.body.imageUrl as string || undefined

        //id
        if(id !== undefined){
            if(id?.length === 0){
                res.status(400)
                throw new Error("Usuario invalido.")
            }
        }
        //name
        if(name !== undefined){
            if(name?.length === 0){
                res.status(400)
                throw new Error("Nome inválido.")
            }
            if(typeof name !== "string"){
                res.status(400)
                throw new Error("Nome precisa ser string")
            }
        }
        //price
        if(price !== undefined){
            if(typeof price !== "number"){
                res.status(400)
                throw new Error("Price precisa ser number")
            }
        }
        if(description !== undefined){
            if(description?.length < 0 && description?.length > 100){
                res.status(400)
                throw new Error("O limite de caracteres da descrição é 0-100 caracteres")
            }
            if(typeof description !== "string"){
                res.status(400)
                throw new Error("Dever ser string")
            }
        }
        if(imageUrl !== undefined){
            if(typeof imageUrl !== "string"){
                res.status(400)
                throw new Error("Dever ser string")            
            }
        }

        const [findId ] = await db("products").where({id:idToSearch})
        if(findId){
            await db("products")
            .where({id: idToSearch})
            .update({
                id: id || findId.id,
                name : name || findId.name,
                price: price || findId.price,
                description: description || findId.description,
                imageUrl: description || findId.imageUrl
            })
        }

        res.status(200).send({message : "Usuário atualizado com sucesso."})
    }catch (error: any) {
        console.log(error);
        if (error.statusCode === 200) {
          res.status(500);
        }
        if (error instanceof Error) {
          res.send(error.message);
        } else {
          res.send("Erro inesperado");
        }
      }
})




