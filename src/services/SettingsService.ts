import {getCustomRepository, Repository} from "typeorm";
import { Setting } from "../entities/Setting";
import {SettingsRepository} from "../repositories/SettingsRepository";

interface ISettingsCreate{
    chat:boolean;
    username:string;
}
class SettingsServices {
    private settingsRepository: Repository <Setting>;
    constructor(){
        this.settingsRepository = getCustomRepository(SettingsRepository);
    } 
    async create({chat, username} : ISettingsCreate){

        //select * from settings where username = "username" limit 1;
        const userAlreadyExits = await this.settingsRepository.findOne({
            username,
        });

        if(userAlreadyExits){
            throw new Error("Este Usuario já Existe");
        }

        const settings = this.settingsRepository.create({
            chat,
            username
        });

        await this.settingsRepository.save(settings);
        
        return settings;
    }
}
 export { SettingsServices }