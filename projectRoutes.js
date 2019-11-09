const express = require('express')
const router = express.Router()
const actionsRouter = require('./actionsRouter')
const Projects = require('./data/helpers/projectModel')

router.get('/', (req, res) => {
    Projects.get()
        .then(project => {
            res.json(project)
        }).catch(err => {
            res.json({ messege: err })
        })
})
router.get('/:id', (req, res) => {
    const id = req.params.id
    Projects.get(id)
        .then(project => {
            if (project)
                res.json(project)
            else
                res.status(500).json({ messege: 'project with id could not be found' })
        }).catch(() => {
            res.status(400).json({ messege: 'id could not be found' })
        })
})
router.post('/', (req, res) => {
    const project = req.body
    Projects.insert(project)
        .then(() => {
            res.status(201).json({ messege: 'Project add Success!' })
        }).catch(() => {
            res.status(400).json({ messege: 'project missing details...' })
        })
})
router.put('/:id', (req, res) => {
    var project = req.body
    const id = req.params.id

    Projects.update(id, project)
        .then(project => {
            if (!project)
                res.status(500).json({ messege: 'update DID NOT WOR ' })
            else
                res.status(200).json({
                    messege: 'update sucess',
                    project
                })
        }).catch(() => {
            res.status(400).json({ messege: 'project missing details' })
        })
})
router.delete('/:id', (req, res) => {
    const id = req.params.id
    Projects.get(id)
        .then(project => {
            if (!project)
                res.status(500).json({ messege: 'an error has ocurred' })
            else
                Projects.remove(project.id)
                    .then(() => {
                        res.status(201).json({
                            messege: 'delete success... project is gone forever boss.'
                        })
                    }).catch(() => {
                        res.status(500).json({ messege: 'delete could not be completed boss?' })
                    })
        })
        .catch(() => {
            res.status(400).json({ messege: 'an id is required..' })
        })
})

router.use('/', actionsRouter)

module.exports = router