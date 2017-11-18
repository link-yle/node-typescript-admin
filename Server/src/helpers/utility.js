
const badRequest = (res, statement) => {
    return res.status(400).json(`An Error occurred while trying ${statement}`)
}

const missingData = (res, item) => {
    return res.status(400).json(`You did not provide ${item}`)
}

const notFound = (res, item) => {
    return res.status(400).json(`This ${item} is not found`)
}

module.exports = {
     badRequest, missingData, notFound
}