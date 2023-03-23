import { TUser, TProduct, TPurchase, categorias } from "./types"


export const users : TUser[] = [
    {id:"001",
    email:"hgtleohgt",
    password:"leo123"}
    ,
    {id:"002",
    email:"danieleandrade",
    password:"dani1403"}
]

export function createUser (id:string, email:string, password:string){
    users.push({
        id:id,
        email:email,
        password:password
    })
    console.log("Usuario cadastrado com sucesso")
}

export function getAllUsers (){
    users.map((elem)=>{
        console.log(`ID: ${elem.id} || ${elem.email} || ${elem.password}`)
    })
}

export const products: TProduct[] =[
    {
        id:"001",
        nome:"shampoo",
        price:14.00,
        category: categorias.Limpeza
    },
    {
        id:"002",
        nome:"feijao",
        price:10.00,
        category:categorias.Comida
    }
]

export function createProduct (id:string, nome:string, price:number, category: categorias){
    products.push({
        id:id,
        nome:nome,
        price:price,
        category:category
    })
}

export function getAllProducts (){
    products.map((elem)=>{
        console.log(`ID: ${elem.id} || ${elem.nome} || ${elem.price} || ${elem.category}`)
    })
}
export function getProductById (idToSearch:string){
    products.map((elem)=>{
        if(elem.id === idToSearch){
            console.log(elem)
        }
    })
}


export const purchases: TPurchase[] =[
    {
        userId:"001",
        productId:"001",
        quantity:3,
        totalPrice:42.00
    },
    {
        userId:"002",
        productId:"002",
        quantity:3,
        totalPrice:30.00
    }
]