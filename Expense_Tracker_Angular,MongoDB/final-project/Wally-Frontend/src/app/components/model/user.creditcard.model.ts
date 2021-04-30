export class userCreditCard {

  constructor(
     public userName: String, //associated wally account current user email
     public bankName: String, //discover
     public accountType: String,
     public bankUserName: String,
     public bankPassword: String,
     public billDueDate:Date,
     public transactions:[{
          category : String, //grocery,transport, shopping
          date : Date,
          description: String, //place of transaction
          amount: Number
      }]
   ) {  }

}

