const fs = require('fs');
const { Server } = require('http');
const { MinecraftServer } = require('minecraft-java-server');
const path = require('path');
// const { getPort } = require('get-port');


const GetServeur = async (req, res) => {
    let serveuron = [];
    
    let directory_name = "../DataServeur";
    let openedDir = fs.opendirSync(directory_name);
    let filesLeft = true;
    while (filesLeft) {
        let fileDirent = openedDir.readSync();
        if (fileDirent != null)
            if (fileDirent.name.indexOf('off') != -1) {
                // console.log(fileDirent.name + " is ready")
                serveuron.push(fileDirent.name)
              
            }else{
                // console.log(fileDirent.name + " is not ready")
            }
            else filesLeft = false;
    }
    if(serveuron.length != 0){
        maxNB = serveuron.length;
        min = Math.ceil(0);
        max = Math.floor(maxNB);
        random = Math.floor(Math.random() * (max - min) + min);

        var ServerDisponible = serveuron[random];
        var path = "../DataServeur/"+ServerDisponible;
        var replace = path.replaceAll('off', 'on')

        fs.rename(path, replace, function(err) {
                if (err) {
                  console.log(err)
                } else {
                    var ports =  25576;
                    const server = new MinecraftServer({
                        jar: 'server.jar',
                        path: 'C:/Users/lucas/Desktop/serveur minecraft/DataServeur/'+ replace,
                    
                        args: ['-Xms1G', '-Xmx1G'],
                    
                        // Minecraft's eula must be agreed to using this value
                        eula: true,
                        port: ports,
                        // every property is the equivalent of server.properties, except for vital ones
                        properties: {
                            motd: "Minecraft server hosted with minecraft-java-server",
                            "max-players": 3
                        }
                    });    
                    // Start event
                    server.on('start', () => {
                        console.log('Server started');
                        res.json({
                            results:"Serveur en ligne sur le port "+ports,
                        })
                        res.end();
                    });
                    
                    // Stop event
                    server.on('stop', () => {
                        console.log('Server stopped');
                    });

                    server.on('crash', () => {
                        console.log('Server crashed');
                    });
                    
                    // Start the server
                    server.start();
                    // port = await getPort({port: [3000, 3001, 3002]});
                }
              })
    }else{
        res.json({
            results:"Aucun serveur n\'est disponible"
        })
        res.end();
    }
}


module.exports = { GetServeur }


//serveur mc
 // const { email, password, cookie, savecookie } = req.body;
// server.send('ban herobrine').then(response => {
//     console.log('Command result: ', response);
// }).catch(err => console.log('Failed to run command', err));