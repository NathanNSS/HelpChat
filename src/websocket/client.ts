import { io } from "../http";
import { ConnectionsService } from "../services/ConnectionsService";
import { UsersService } from "../services/UsersService";
import { MessagesServices } from "../services/MessagesServices";

interface IParams{
    text:string;
    email:string;
}

io.on("connect", (socket) => {
    const connectionsService = new ConnectionsService(); 
    const usersService = new UsersService();
    const messagesService = new MessagesServices();

    socket.on("client_first_access", async (params) => {
        const socket_id = socket.id;
        const { text, email } = params as IParams;
        let user_id = null;

        const userExists = await usersService.findByEmail(email);

        if(!userExists){
            const user = await usersService.create(email);

            await connectionsService.create({
                socket_id,
                user_id: user.id
            });

            user_id = user.id;

        }else{
            user_id = userExists.id
            const connection = await connectionsService.findByUserId(userExists.id);

            if(!connection){
                await connectionsService.create({
                    socket_id,
                    user_id: userExists.id
                })
            }else{
                connection.socket_id = socket_id;
                await connectionsService.create(connection);
            }
        }
        await messagesService.create({
            text,
            user_id,
        });

        const allMessages = await messagesService.listByUser(user_id);

        socket.emit("client_list_all_messages", allMessages);
    });

    socket.on("client_send_to_admin", async (params) => {
        const { text, socket_admin_id } = params;
    
        const socket_id = socket.id;
    
        const { user_id } = await connectionsService.findBySocketID(socket_id);
    
        const message = await messagesService.create({
          text,
          user_id,
        });

        console.log("--------------Teste----------------")
        console.log("admin_id: "+socket_admin_id);
        console.log("socket_id: "+socket_id);
        console.log("text: "+text);
        console.log("user_id: "+user_id);
        console.log("message.text: "+message.text);
        console.log("message.user_id: "+message.user_id);
        console.log("-----------------------------------")
        
        io.to(socket_admin_id).emit("admin_receive_message", {
            message,
            socket_id,
        });
    });
});