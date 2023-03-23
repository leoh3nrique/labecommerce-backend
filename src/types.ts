export type TUser = {
    id:string, 
    email:string,
    password:string
}

export enum categorias {
    "Limpeza" = "Produto para limpeza",
    "Roupas" = "Roupas",
    "Comida" = "Comida"
}


export type TProduct = {
    id:string,
    nome:string,
    price:number,
    category: categorias
}

export type TPurchase = {
    userId:string,
    productId:string,
    quantity:number,
    totalPrice:number
}