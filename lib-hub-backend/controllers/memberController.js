import Member from "../models/Member.js";


export const getMembers = async(req, res) => {
    try{
        const members = await Member.find();
        res.json(members)
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}


export const addMember = async(req, res) => {
    try{
        const member = new Member(req.body)
        const members = await member.save()
        res.status(201).json(members)
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}


export const deleteMember = async(req, res) => {
    try{
        const memberId = req.params.id
        await Member.findByIdAndDelete(memberId)
        res.status(204).send()
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}


export const updateMember = async(req, res) => {
    try{
        const memberId = req.params.id
        const members = await Member.findByIdAndUpdate(memberId, req.body, {new: true})
        res.status(204).json(members)
    }catch(err){
        res.status(400).json({ message: err.message });
    }
}