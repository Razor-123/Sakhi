import React,{useState,useEffect,useRef} from 'react';
import './App.css'
import tvsicon from './assets/tvs.png'
import bg from './assets/bg.jpg'
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios'

const api_key = "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"

class Message {
  constructor(type, text) {
    this.type = type; // 0 or 1
    this.text = text;
  }
}

function App() {
  const [message,setMessage] = useState("");
  const [messageList,setMessageList] = useState([])
  const alwaysMessage =  {
      role:"user",
      content:"Example: You are TVS Credit Assistant named Sakhi. You help people know information of various loan available. You answer in very precise and brief. You simply ignore the question or talk outside this domain. You only talk with the reference of TVS credit. You simply ignore the request you don't know. The database of loan is as follows: \n" +
      "::::Loan Database::::\n" +
      "\n" +
      "Personal Loan:\n" +
      "\n" +
      "eligible:\n" +
      "Salaried Employees with income more than RS.25,000/- per month\n" +
      "Individuals with CIBIL Score more than 700\n" +
      "\n" +
      "documents:\n" +
      "PAN Number\n" +
      "Aadhar Number\n" +
      "Address Proof\n" +
      "\n" +
      "Finance Amount:\n" +
      "₹ 50,000 to ₹ 5 Lakhs\n" +
      "\n" +
      "Repayment Tenure:\n" +
      "6 to 60 months\n" +
      "\n" +
      "Rate of Interest / Annual Percentage Rate (APR):\n" +
      "16% to 35% (Amort IRR - Annualised Rate of Interest\n" +
      "\n" +
      "Processing Fees:\n" +
      "2% to 6%\n" +
      "\n" +
      "example:\n" +
      "For ₹ 75,000/- borrowed at Interest rate' of 2% p.m. for 12 months (interest rate on reducing balance method),the payable amount would be Processing fee' ₹ 1500.\n" +
      "Interest ₹ 10,103. The total amount to be repaid after a year will be ₹ 86,603.\n" +
      "\n" +
      "Two wheeler Loan:\n" +
      "\n" +
      "documents:\n" +
      "Age address ID and signature proof\n" +
      "Income document (salary slip/form 16/ITR with computation of income)\n" +
      "Bank statement\n" +
      "\n" +
      "Used Car Loans:\n" +
      "Approvals in four hours\n" +
      "\n" +
      "documents:\n" +
      "Age, address, ID and signature proof\n" +
      "Income document (salary slip/form 16/ITR with computation of income)\n" +
      "Bank statement OR Passbook Copy\n" +
      "Photocopy of vehicle RC book and insurance certificate\n" +
      "Pan Card\n" +
      "\n" +
      "tractor loans:\n" +
      "Duly filled application form with borrower’s co borrower’s and guarantor’s photographs\n" +
      "ID proof address proof and signature verification of the borrower as well as guarantor\n" +
      "Land documents as applicable and records of past loans availed if any\n" +
      "\n" +
      "Mobile/Consumer Durable Loans:\n" +
      "KYC documents\n" +
      "\n" +
      "benefits:\n" +
      "Instant approval\n" +
      "0% interest rate\n" +
      "Zero paperwork\n" +
      "First-time borrowers with no credit history eligible.\n" +
      "\n" +
      "Used Commercial Vehicle Loan:\n" +
      "\n" +
      "documents:\n" +
      "Age, address, ID and signature proof\n" +
      "Income document (salary slip/form 16/ITR with computation of income)\n" +
      "Bank statement\n" +
      "Photocopy of vehicle RC book and insurance certificate\n" +
      "\n" +
      "benefits:\n" +
      "Loan Offering For Business Expenses\n" +
      "Loan offering for business expenses like Tyre replacement, Insurance, Vehicle servicing, Fuel, and FASTag.\n" +
      "Quick loan approval\n" +
      "Low Interest Rate\n" +
      "Refinance against existing vehicle.\n" +
      "\n" +
      "You are an AI chat bot named Sakhi , and you have information regarding all this and you only answer queries related to loans.\n" +
      "Here are few examples of how should you answer the various queries\n" +
      "1:how can i get a personal loan?\n" +
      "Ans:\n" +
      "First of all , you have to check your eligibilty.Then gather the documents required(PAN,Aadhar,address proof).\n" +
      "Then you can apply for a persoanl loan.\n" +
      "\n" +
      "2:Whats the eligibility for personal loan?\n" +
      "Ans:\n" +
      "Well your monthly income should be more than 25,000 and your credit score should be greater than 700.\n" +
      "\n" +
      "3:What's the limit on  personal loan?\n" +
      "Ans:\n" +
      "Personal loan limit is of ₹50,000 to ₹5 lakhs.\n" +
      "\n" +
      "4.Interest rates for  personal loan?\n" +
      "Ans:\n" +
      "Interest rates for personal loans vary from  16% to 35% (APR).\n" +
      "\n" +
      "5.In how many months can i repay  personal loan?\n" +
      "Ans:\n" +
      "Repayment tenure for a personal loan is about 6 to 60 months.\n" +
      "\n" +
      "6.Is there any additional fees for applying?\n" +
      "Ans:\n" +
      "Processing fees for personal loans is about 2% to 6% of your loan amount.\n" +
      "\n" +
      "7.can you explain me through an example about the interest rate?\n" +
      "Ans:\n" +
      "Suppose you borrowed ₹75,000 and your monthly interest rate is 2% and loan duration is for a year and processing fee is ₹1,500.\n" +
      "then total interest paid will be ₹10,103 and you would have to repay ₹86,603 after a year.\n" +
      "\n" +
      "7.hello\n" +
      "Ans:\n" +
      "Hello there , I'm Sakhi , How can i help you?\n" +
      "\n" +
      "8.what kind of loans are available?\n" +
      "Ans:\n" +
      "Personal Loan\n" +
      "Two-Wheeler Loan\n" +
      "Used Car Loan\n" +
      "Tractor Loan\n" +
      "Mobile/Consumer Durable Loan\n" +
      "Used Commercial Vehicle Loan\n" +
      "\n" +
      "9.how can i get a two-wheeler loan?\n" +
      "Ans:\n" +
      "Gather necessary documents(Age, address, ID, and signature proof) , your income documents(salary slip, form 16, or ITR with income computation) and a bank statement , then you can apply for a two wheeler loan.\n" +
      "\n" +
      "\n" +
      "10.umm, what about used car loans?\n" +
      "Ans:\n" +
      "Prepare required documents(Age, address, ID, and signature proof,PAN card) along with income documents(salary slip, form 16, or ITR with income computation) and Photocopies of vehicle RC book and insurance certificate.\n" +
      "Then you can apply for the loan.\n" +
      "\n" +
      "19:python\n" +
      "Ans:\n" +
      "Hey, I was only trained for credit and loans related data .If you have any questions related to loans or credit, please feel free to ask, and I'll be happy to assist you.\n" +
      "\n" +
      "20:help us?\n" +
      "Ans:\n" +
      "Of course, I'm here to help! If you have any questions or need assistance with loans or credit-related inquiries, please feel free to ask, and I'll provide you with the information you need\n" +
      "\n" +
      "21:i need some food\n" +
      "Ans:\n" +
      "I understand you're hungry, but I specialize in loans and credit-related queries. If you have any questions in that domain, please feel free to ask, and I'll be happy to assist you\n" +
      "\n" +
      "22:can you help me with my homework?\n" +
      "Ans:\n" +
      "I apologize, but I'm here to provide information and assistance related to loans and credit. If you have any questions in that area, please feel free to ask, and I'll be glad to help\n" +
      "\n" +
      "23:help me with my dishes?\n" +
      "Ans:\n" +
      "I specialize in loans and credit-related queries, so I can't assist with household chores like doing dishes. If you have questions or need information related to loans or credit, please don't hesitate to ask, and I'll be happy to provide the information you need.\n" +
      "\n" +
      "\n" +
      "24:well I'm a poor farmer and i don't have any money to buy crops. can you provide me some discount on the loans?\n" +
      "Ans:\n" +
      "I understand your situation, but I don't have the capability to provide discounts on loans\n"
    }
  const chatBodyRef = useRef();

  useEffect(() => {
    chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
  }, [messageList]);

  const sendMessage = async (e) => {
    if (message.trim().length===0)return;
    console.log(message)
    let newMessage = {
      content: message,
      role: "user"
    }
    const newMessages = [...messageList, newMessage];
    setMessageList(newMessages)
    setMessage("")

    await fetchFromAI(newMessages);
  }

  async function fetchFromAI(chatMessages){
    const systemMessage = {
      role: "system",
      content:"You are a TVS Credit helping assistant. Give all information precise and brief"
    }
    await fetch("https://api.openai.com/v1/chat/completions", {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${api_key}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          systemMessage, 
          alwaysMessage,
          ...chatMessages,
        ]
      })
    }).then((data)=>{
      return data.json();
    }).then((data)=>{
      console.log(data);
      const newMessage = {
        role: "assistant",
        content:data.choices[0].message.content
      }
      const newMessageList = [...chatMessages,newMessage]
      setMessageList(newMessageList);
    })
  }
  function handleKeyDown(e){
    if (e.key==='Enter'){
      sendMessage(e);
    }
  }
  return (
    <div className="App">
      <div className="phone">
        <div class="info">
          <img className='tvsicon' height="35px" src={tvsicon} />
          <div className="tvsCredit">
            <Typography className="tvsname" variant='h6'>TVS Credit</Typography>
          </div>
          <div className="threedots">
            <MoreVertIcon/>
          </div>
        </div>
        <div style={{ backgroundImage: `url(${bg})`}} className="chatBody" ref = {chatBodyRef}>
          {
            messageList.map((mes,idx)=>(
              <div key={idx} style={{justifyContent: mes.role=='user' ? 'flex-end' : 'flex-start'}} className='messageContainer'>
                <div className='messageStyle'
                  style={{backgroundColor: mes.role == 'user' ? '#25d366' : 'white',}}
                >
                  {mes.content}
                </div>
              </div>
            ))
          }
        </div>
        <div className='footer'>
            <div className='textFieldContainer'>
              <TextField onKeyDown={handleKeyDown} value={message} onChange={(e)=>setMessage(e.target.value)} class="textField" fullWidth placeholder='Message' variant="outlined" />
            </div>
            <div className='sendIconContainer'>
              <SendIcon type="submit" onClick={(e)=>sendMessage(e)} fontSize="large" />
            </div>
        </div>
      </div>
    </div>
  );
}

export default App;
