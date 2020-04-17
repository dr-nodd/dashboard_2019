async function about(req, res) {
    const dateTime = Date.now();
    const timestamp = Math.floor(dateTime / 1000);
    const ip = req.client._peername.address;

    return res.status(200).json({
        "client ": {
        "host":  ip,
        },
        "server ": {
        "current_time ": timestamp,
            "services ": [{
            "name": "Nasa Service",
            "widgets ": [{
                "name": "Nasa",
                "description ": "Display photos taken by the rovers on Mars",
                "params ": [{
                    "name": "Rover",
                    "type": "string"
                }, {
                    "name": "Photo",
                    "type": "string"
                }]
            }]
            }, {
            "name": "Weather Service",
            "widgets ": [{
                "name": "accuWeather",
                "description ": "Display today's weather for a city",
                "params ": [{
                    "name": "City",
                    "type": "string"
                }]
            }]
            }, {
            "name": "Exchange Service",
            "widgets ": [{
                "name": "Exchange",
                "description ": "Converter between currencies based on last rate",
                "params ": [{
                    "name": "Base currency",
                    "type": "string"
                }, {
                    "name": "Exchange currency",
                    "type": "string"
                }]
            }]
            }, {
            "name": "Harry Potter Service",
            "widgets ": [{
                "name": "Harry Potter",
                "description ": "Displays information on a character based on his house",
                "params ": [{
                    "name": "Houses",
                    "type": "string"
                }]
            }]
            }, {
                "name": "Quiz Service",
                "widgets ": [{
                    "name": "Quiz",
                    "description ": "Play a trivia quiz",
                    "params ": [{
                        "name": "Quiz difficulty",
                        "type": "string"
                    }, {
                        "name": "Quiz category",
                        "type": "int",
                    }]
                }]
            }, {
                "name": "Movie Service",
                "widgets ": [{
                    "name": "Movie",
                    "description ": "Displays information on a movie",
                    "params ": [{
                        "name": "Movie",
                        "type": "string"
                    }]
                }]
            }]
        }
    });
}

exports.about = about;
