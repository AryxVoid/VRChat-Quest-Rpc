let RPC = require('discord-rpc');
const clientId = '988957464395382804';
let startTimestamp = new Date();
let quest = {}


const vrchat = require("vrchat");

const configuration = new vrchat.Configuration({
    username: '', // Your Username
    password: '' // Your Password
    
});

const AuthenticationApi = new vrchat.AuthenticationApi(configuration);
const UsersApi = new vrchat.UsersApi(configuration);
const WorldsApi = new vrchat.WorldsApi(configuration);





const rpc = new RPC.Client({
    transport: "ipc"
})

async function setActivity() {
    if (!rpc) {
        return;
    }
    AuthenticationApi.getCurrentUser().then(user => {
        
        UsersApi.getUser(user.data.id).then(u1 =>{
           
        WorldsApi.getWorld(u1.data.worldId).then(world =>{

            WorldsApi.getWorldInstance(world.data.id, u1.data.instanceId).then(instance =>{
                


           function getworld(){
                if(world.data.name.length < 0){
                    return 'Not In A World'
                }
                return world.data.name
           }

           function getservercount(){
            let count = world.data.capacity
            if(count.toString().length < 1){
                return 'No Player Capacity'
            }
            return count
           }

           function getplayers(){
            let count = instance.data.n_users
            if(count.toString().length < 0){
                return 'No Players'
            }
            return count
           }

           function updatelink(){
            var link = `https://vrchat.com/home/launch?worldId=${world.data.id}&instanceId=${instance.data.name}~region(use)`
            // if link invalid, return error
            if(link.length < 1){
                return 'Invalid Link'
            }
            return link
           }

           function updateprofile(){
            var profile = `https://vrchat.com/home/profile/${user.data.id}`
            // if link invalid, return error
            if(profile.length < 1){
                return 'Invalid Link'
            }
            return profile
           }

           function makeid(){
 
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for( var i=0; i < 5; i++ )
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            return text;
        }
       
        
        
        rpc.setActivity({
            pid: process.pid,
            details: `Current World: ` + getworld(),
            state: `Current User:  ${user.data.displayName}`,
            startTimestamp,
            userTimer: true,
            largeImageKey: 'quest2',
            largeImageText: 'Current Status: ' + user.data.status,
            smallImageKey: 'aryx',
            smallImageText: `Users In World: ${getplayers()}/${getservercount()} `,
            buttons : [{label: "Join World 🌐" , url: updatelink()}, {label: "Profile 🎧" , url:  updateprofile()}],
            instance: true
        })

        })

        });

       
    })
       
});

}

rpc.on('ready', () => {
    console.warn('Make sure VRChat is running before usage.')
    console.log('rpc online, and ready to show vrchat updates.')
  
    setInterval(() => {
        setActivity();
    }, 5000); // every 5 seconds update the rpc status});

})


quest.rpcStart = function () {
    rpc.login({
        clientId
    })
}

quest.rpcStart()
