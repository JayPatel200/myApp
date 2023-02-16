const Tenant = require('../model/Tenant');

const getAllTenants = async (req, res) => {
    const tenants = await Tenant.find();
    if (!tenants) return res.status(204).json({ 'message': 'No tenants found.' });
    res.json(tenants);
}

const createNewTenant = async (req, res) => {
    if (!req?.body?.firstname || !req?.body?.lastname) {
        return res.status(400).json({ 'message': 'First and last names are required' });
    }

    try {
        const result = await Tenant.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname
        });

        res.status(201).json(result);
    } catch (err) {
        console.error(err);
    }
}

const updateTenant = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const tenant = await Tenant.findOne({ _id: req.body.id }).exec();
    if (!tenant) {
        return res.status(204).json({ "message": `No tenant matches ID ${req.body.id}.` });
    }
    if (req.body?.firstname) tenant.firstname = req.body.firstname;
    if (req.body?.lastname) tenant.lastname = req.body.lastname;
    const result = await tenant.save();
    res.json(result);
}

const deleteTenant = async (req, res) => {
    if (!req?.body?.id) return res.status(400).json({ 'message': 'Tenant ID required.' });

    const tenant = await tenant.findOne({ _id: req.body.id }).exec();
    if (!tenant) {
        return res.status(204).json({ "message": `No tenant matches ID ${req.body.id}.` });
    }
    const result = await tenant.deleteOne(); //{ _id: req.body.id }
    res.json(result);
}

const getTenant = async (req, res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'Tenant ID required.' });

    const tenant = await Tenant.findOne({ _id: req.params.id }).exec();
    if (!tenant) {
        return res.status(204).json({ "message": `No tenant matches ID ${req.params.id}.` });
    }
    res.json(tenant);
}

module.exports = {
    getAllTenants,
    createNewTenant,
    updateTenant,
    deleteTenant,
    getTenant
}