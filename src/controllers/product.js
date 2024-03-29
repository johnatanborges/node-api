const mongoose = require('mongoose')
const Product = mongoose.model('Product')


exports.get = (req, res, next) => {
    Product
        .find({ active: true }, 'title price slug tags')
        .then((data) => {
            res.status(200).send(data)
        }).catch(error => {
            res.status(400).send(error)
        })
}

exports.getById = (req, res, next) => {
    Product
        .findById(req.params.id)
        .then((data) => {
            res.status(200).send(data)
        }).catch(error => {
            res.status(400).send(error)
        })
}

exports.getBySlug = (req, res, next) => {
    Product
        .findOne({ slug: req.params.slug }, 'title description price slug tags')
        .then((data) => {
            res.status(200).send(data)
        }).catch(error => {
            res.status(400).send(error)
        })
}

exports.getByTag = (req, res, next) => {
    Product
        .find({ tags: req.params.tag, active: true }, 'title description price slug tags')
        .then(data => {
            res.status(200).send(data)
        }).catch(error => {
            res.status(400).send(error)
        })
}

exports.post = (req, res, next) => {
    const product = new Product({
        title: req.body.title,
        description: req.body.description,
        slug: req.body.slug,
        price: req.body.price,
        tags: req.body.tags,
        active: req.body.active
    })

    product
        .save()
        .then(() => {
            res.status(201).send({
                message: 'Produto criado com sucesso!'
            })
        }).catch(error => {
            res.status(400).send(error)
        })
}

exports.put = (req, res, next) => {
    Product
        .findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                description: req.body.description,
                price: req.body.price
            }
        })
        .then(() => {
            res.status(200).send({
                message: 'Produto atualizado com sucesso!'
            })
        }).catch(error => {
            res.status(400).send({
                message: 'Falha ao atualizar o produto',
            }, console.log(error))
        })
}

exports.delete = (req, res, next) => {
    Product
        .findByIdAndDelete(req.body.id)
        .then(() => {
            res.status(200).send({
                message: 'Produto removido com sucesso!'
            })
        }).catch(error => {
            res.status(400).send({
                message: 'Falha ao atualizar o produto',
            }, console.log(error))
        })
}
