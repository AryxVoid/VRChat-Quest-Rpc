let RPC = require('discord-rpc');
const clientId = '988957464395382804';
let startTimestamp = new Date();
let core = {}


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

function makeid(){
 
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}

async function setActivity() {
    if (!rpc) {
        return;
    }
    AuthenticationApi.getCurrentUser().then(user => {
        
        UsersApi.getUser(user.data.id).then(u1 =>{
           
        WorldsApi.getWorld(u1.data.worldId).then(world =>{


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

           


        rpc.setActivity({
            pid: process.pid,
            details: `Current World: ` + getworld(),
            state: `Current User:  ${user.data.username}`,
            startTimestamp,
            userTimer: true,
            largeImageKey: 'quest2',
            largeImageText: 'Current Status: ' + user.data.status,
            smallImageKey: 'aryx',
            smallImageText: `World Capacity: ` + getservercount(),
            buttons : [
            {
                label : "Join World" ,
                url : `https://vrchat.com/home/launch?worldId=${world.data.id}&instanceId=${makeid()}~private(${user.data.id})~canRequestInvite~region(us)~nonce(3767b4e7-9b25-44b9-f43f-a8cedfa2ffd8)`
            },
            {
                label : "User Profile" ,
                url : `https://vrchat.com/home/user/${user.data.id}`
            }
        ],
            instance: false
        })

        });

       
    })
       
});

}

rpc.on('ready', () => {
    console.log('rpc online, and ready to show vrchat updates.')
    setInterval(() => {
        setActivity();
    }, 5000); // every 5 seconds update the rpc status});

})


core.rpcStart = function () {
    rpc.login({
        clientId
    })
}

core.rpcStart()
