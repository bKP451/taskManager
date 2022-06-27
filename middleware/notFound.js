const notFound = (request, response) => 
{
    response.status(404).send("The resource you are requesting does not exist");

}

module.exports = notFound;