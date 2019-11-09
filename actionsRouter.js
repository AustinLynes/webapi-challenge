const express = require('express')
const router = express.Router()
const Actions = require('./data/helpers/actionModel')
const Projects = require('./data/helpers/projectModel')

router.get('/:id/actions', (req, res) => {
    const id = req.params.id
    Projects.get(id)
        .then(project => {
            if (!project)
                res.status(500).json({ messege: 'no Project with that ID boss...' })
            else {
                Projects.getProjectActions(id)
                    .then(action => {
                        if (action.length > 0)
                            res.json(action)
                        else
                            res.json({ messege: 'this project has no actions boss...' })
                    }).catch(err => {
                        res.status(404).json({ messege: 'No Actions Found here Boss...' })
                    });
            }
        }).catch(() => {
            res.status(404).json({ messege: 'Project has no Actions' })
        })
})

router.post('/:id/actions', (req, res) => {
    const id = req.params.id
    var action = req.body
    Projects.get(id)
        .then(project => {
            action = { ...action, project_id: project.id }
            Actions.insert(action)
                .then(act => {
                    res.status(201).json({ messege: 'action Create Successfully', act })
                }).catch(() => {
                    res.status(500).json({ messege: 'actions missing informations' })
                })
        })
        .catch(() => {
            res.status(404).json({ messege: 'Project Not Found...' })
        })
})
router.put('/:id/actions/:actionid', (req, res) => {
    const { id, actionid } = req.params
    var action = req.body
    Projects.get(id)
        .then(project => {
            Actions.update(actionid, action)
                .then(act=> {
                    res.status(201).json({ messege: 'Update Sucess boss', act })
                })
                .catch(() => {
                    res.status(500).json({ messege: 'could not update Action... sorry boss' })
                })
        })
        .catch(() => {
            res.status(404).json({ messege: 'Project Not Found...' })
        })
})
router.delete('/:id/actions/:actionid', (req, res) => {
    const { id, actionid } = req.params
    Projects.get(id)
        .then(project => {
            Actions.remove(actionid)
                .then(() => {
                    res.status(201).json({ messege: 'action Deleted Successfully boss..' })
                }).catch(() => {
                    res.status(500).json({ messege: 'actions Could not be Deleted boss..' })
                })
        })
        .catch(() => {
            res.status(404).json({ messege: 'Project Not Found...' })
        })
})

// {
//     get: [Function: get],
//     insert: [Function: insert],
//     update: [Function: update],
//     remove: [Function: remove]
//   }

module.exports = router