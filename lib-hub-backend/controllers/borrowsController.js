import Borrows from "../models/Borrows.js"


export const addBorrow = async(req, res) =>{
    try{
        console.log(req.body)
        const borrowBook = new Borrows(req.body);
        const saved = await borrowBook.save();
        res.status(201).json(saved);
    }catch(err){
        console.log("Error in borrowing a book controller");
        res.status(500).json({message:err.message.message});
    }
}


export const getBorrows = async(req, res) =>{
    try {
        const borrowedBooks = await Borrows.find();
        res.status(200).json(borrowedBooks);
    } catch (err) {
        console.log("Error in getting the borrowed books controller");
        res.status(501).json({message:err.message});
    }
}


export const deleteBorrowedBooks = async(req, res) =>{
    try {
        await Borrows.findByIdAndDelete(req.params.id)
        res.status(200).send()
    } catch (err) {
        console.log("Error in deleting a borrowed book controller");
        res.status(500).json({message:err.message})
    }
}

export const updateBorrowedBooks = async(req, res) => {
    try {
        const updated = await Borrows.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).json(updated)
    } catch (error) {
        console.log("Error in updating a borrowed book controller");
        res.status(500).json({message:error.message})
    }
}