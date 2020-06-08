//import { Address } from './address.model';
export interface Candidate {
    
    id: string;
    title: string;
    content: string;
    //id: string;
    imagePath: string;
    cityName:string;
    firstName:string,
    lastName: string,
    mainPhone: string,
    secondPhone: string,
    ageRange: string,
    age: string,
    academy: string,
    remark: string,
    area: string,
    female:string,
    colorEye: string,
    colorHair: string,
    colorSkin: string, 
    eda: string,
    hobies: string,
    street:string,
    sector:string

   
  }



/*
mapToAddress(): Observable<Address[]> {
  this.getClients.pipe(
    map((clients: Client[]) => clients.map(client => client.address))
  )
}
*/

  