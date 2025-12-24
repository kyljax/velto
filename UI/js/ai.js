
// alert("hdjdhfjdfhfdjhf")


// const items = document.querySelectorAll('#shlider li');
// let index = 0;

// items[index].classList.add('active');


// setInterval(() => {
//     // items.forEach(el => el.style.transform = 'rotateY(0deg)');
//     items[index].classList.remove('active');
    
//     items[index].style.transform = 'rotateY(0deg)';
//     index = (index + 1) % items.length;
//     items[index].classList.add('active');
//     items[index].style.transform = 'rotateY(180deg)';

// }, 2000);

const user = JSON.parse(localStorage.getItem("user"));
if(!user){
    console.log("user is not valid");
}
else{
    console.log(user)
    const profile =  user.dataToFrontend[1];

   const noli = document.querySelectorAll(".noLi")[0];
   if (noli) {
    noli.style.borderRadius = "12px";
    noli.style.border = "2px solid green"
    noli.style.boxShadow = " black 1px 1px 15px"
    noli.style.background = "darkblue";
    noli.style.fon = "darkblue";
    // noli.style.textAlign = "center";
   noli.innerHTML = `<a href='profile.html'style='padding:3%;width:100%;font-size:.89rem;color:white'>${profile}'s Profile<a/>`;
   }

//    console.log(noli)
//    console.log(profile)
}
let history = [];
const navbar__menu_mobile = document.querySelector(".navbar__menu-mobile");
const navbar__menu = document.querySelector('.navbar__menu');
const prfBal = document.getElementById("prfBal");
const prfBalPrf = document.querySelectorAll(".prfBalPrf");
console.log(prfBalPrf)
let nwBal;
if(navbar__menu_mobile){
        navbar__menu_mobile.style.display = "none";
        navbar__menu.style.display = "block";
        var loginStatus ;
}
        const dspnx = document.getElementsByClassName("dspnx");
        console.log(dspnx);
        for (let index = 0; index < dspnx.length; index++) {
            const element = dspnx[index];
            
        console.log(element);
        }


if (navbar__menu_mobile) {
    // console.log(document.querySelector(".navbar__menu-mobile")); 
    navbar__menu_mobile.addEventListener("click",(e)=>{
        // alert(navbar__menu_mobile)
        e.preventDefault();
        navbar__menu_mobile.style.display = "none";
        navbar__menu.style.display = "block";
        navbar__menu.style.fontSize = "12px"
    })
    
}

// const user = JSON.parse(localStorage.getItem("user"));
// document.getElementById("Pfname").innerHTML = user.exists.fname;
// document.getElementById("Plname").innerHTML = user.exists.lname;

// function getUserBalance(userBalance)=> {
    // window.addEventListener("load",async(e)=>{
    //     const data = {
    //         userId:user.dataToFrontend[2],
    //         // password:password
    //        }
    
    //         console.log(data.userId);
    //         const accountNumber = data.userId
    //         if (accountNumber) {
                
    //         try {
    //             const response = await fetch("/api/v1/auth/loginData", {
    //                         method:"GET",
    //                         // headers:{"Content-Type":"application/json"},
    //                         // body:JSON.stringify({data}),
    //                         })
    //                 const result =await response.json();
    //                 console.log(result);
    //             }
    //             catch(error){
    //                 console.error(error)
    //             }
                
    //         }
    

    // })
    
// }


const loginForm = document.getElementById("loginForm");
if (loginForm) {
    // alert("")
    loginForm.addEventListener("submit", async(e)=>{
        e.preventDefault();
        const formData = new FormData(loginForm);
        // const data = Object.fromEntries(formData.entries());
       const inp = loginForm.getElementsByTagName("input");
       console.log(inp[0].value,inp[1].value)
       const email = inp[0].value;
       const password = inp[1].value;

       const data = {
        email:email,
        password:password
       }

        console.log(data);
        
     try {
        const response = await fetch("/api/v1/auth/signin", {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({data}),
                    })
            const result =await response.json();
            // document.getElementById("companyId").value="";
            // document.getElementById("username").value="";
            // document.getElementById("password").value="";
        //    let formdat = localStorage.setItem("formData",JSON.stringify(data));
            // window.location.href = "verification.html"; // Redirect to verification page
        console.log(result)
        if (response.ok) {
            console.log(result.dataToFrontend[2]);
            localStorage.setItem("user",JSON.stringify(result))
        //    const user = JSON.parse(localStorage.getItem("user"));
        //    console.log(user);
            if (!result.dataToFrontend[2]) {
                // window.location.href = "index.html"; // Redirect to verification page
                return false;
                
            }
            window.location.href = "profile.html"; // Redirect to verification page

        }
        else{
            alert("email & password Combination Failed!")
        }
        //    const user = JSON.parse(localStorage.getItem("user"));
        // document.getElementById("Pfname").innerHTML = user;
        
            
        // }
        } 
        catch (error) {
        console.error(error);
        }
    });
}
const signUpform = document.getElementById("signUpform");
if (signUpform) {
    // alert("")
    signUpform.addEventListener("submit", async(e)=>{
        e.preventDefault();
        const formData = new FormData(signUpform);
        loginStatus = false;
        otpVerify = false;
        // const data = Object.fromEntries(formData.entries());
       const inp = signUpform.getElementsByTagName("input");
       console.log(inp[0].value,inp[1].value)
       const fname = inp[0].value;
       const lname = inp[1].value;
       const email = inp[2].value;
       const password = inp[3].value;
       const cpassword = inp[4].value;
       const balance = 0.00;
       const transactions = []
       
       inp[0].value ="";
       inp[1].value="";
       inp[2].value="";
       inp[3].value="";
       inp[4].value="";


       const data = {
        fname:fname,
        lname:lname,
        email:email,
        password:password,
        cpassword:cpassword,
        role:"default",
        loginStatus:loginStatus,
        balance:balance,
        transactions:transactions
       }

        console.log(data.fname.length);
        if (data.fname.length <2 || data.lname.length <2) {
            alert("invalid first or lastname");
            return false;
        }
        if (data.email<5) {
            alert("invalid email entered");
            return false;
        }
        if (data.password < 6) {
            alert("password must be longer than 6")
            return false;
        }
        if (data.cpassword !== data.password ) {
            alert("passwords do not match")
            return false;
        }

        
    try {
        const response = await fetch("/api/v1/auth/signup", {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({data}),
                    })
            const result =await response.json();

            // document.getElementById("companyId").value="";
            // document.getElementById("username").value="";
            // document.getElementById("password").value="";
            
            //  inp[0].value ="";
            //  inp[1].value="";
            //  inp[2].value="";
            //  inp[3].value="";
            //  inp[4].value="";
        //    let formdat = localStorage.setItem("formData",JSON.stringify(data));
            // window.location.href = "./otpverify.html"; // Redirect to verification page
        
            // console.log(result);
            
        // }
        if (response.ok) {
            window.location.href = "../login.html"; // Redirect to verification page
        
            console.log(data.loginStatus);
            // alert("ok, girl make i show you my bank account")
        }
        } catch (error) {
        console.error(error);
        }
    });
}

const veriForm = document.getElementById("veriForm");
if(veriForm){
    // alert("")
    veriForm.addEventListener("submit",async(e)=>{
        e.preventDefault(); 
        window.location.href = "../user/transaction.html";
        // alert("hey")
    });
}


const confirmationcc = document.getElementById("confirmationcc");
// var boxofall = [cardNo,cardExp,cardNmbrccvvcc,NOcard]
// const showPword = document.querySelector(".show-password");
// console.log(confirmationcc);
if (confirmationcc) {
    confirmationcc.addEventListener("submit", async(event)=> {
        event.preventDefault();
        // alert('uorrr')
        let cardNo = document.getElementById("cardNo").value;
        let cardExp = document.getElementById("cardExp").value;
        let cardNmbrccvvcc = document.getElementById("cardNmbrccvvcc").value;
        let NOcard = document.getElementById("NOcard").value;
    
        // console.log(boxofall);
        // if (!cardNo=="") {
            formValidation()
            
        // }
        //  document.getElementById("cardNo").value = "";
         document.getElementById("cardExp").value = "";
         document.getElementById("cardNmbrccvvcc").value="";
         document.getElementById("NOcard").value="";
    
         
    });
    
}
function formValidation() {
   if (document.getElementById("cardNo").value == "" ||
   document.getElementById("cardNo").value == null || 
   document.getElementById("cardNo").value == NaN) {
    
    // alert("invalid card number");
    boxofall = "invalid Card Number";
   }
   else{
    boxofall = [cardNo.value,cardExp.value,cardNmbrccvvcc.value,NOcard.value]
   }
   
   console.log(boxofall);
}

const trans_nav_ul_li_a = document.querySelectorAll(".trans_nav_ul_li_a");
// alert("trans_nav_ul_li_a found");
if (trans_nav_ul_li_a) {
    // alert("hey")
    const transact__main = document.querySelectorAll(".transact__main");
   
    // var i;;
    trans_nav_ul_li_a.forEach(element => {
        transact__main[0].classList.remove("dspn");
        transact__main[1].classList.add("dspn")
        transact__main[2].classList.add("dspn")
        transact__main[3].classList.add("dspn")
        // alert(element)
        element.addEventListener("click",(e)=>{
            e.preventDefault();
            // alert("trans_nav_ul_li_a found");
            console.log(element);
            if (element ==trans_nav_ul_li_a[0] ){
                // trans_nav_ul_li_a
                console.log("hello")
                // const transact__main = document.querySelectorAll(".transact__main");
                transact__main[0].classList.add("dspn");
                transact__main[1].classList.add("dspn")
                transact__main[2].classList.add("dspn")
                transact__main[3].classList.remove("dspn")
                console.log(transact__main[0].classList)
                const depoCheck = document.getElementById("depoCheck");
                const accSelection = document.getElementById("accSelection");
                const checkAmount = document.getElementById("checkAmount");
                depoCheck.addEventListener("click",(e)=>{
                    e.preventDefault();
                    let accSelectionVal = accSelection.value;
                    let checkAmn = checkAmount.value;
                    console.log(checkAmn);
                    alert(accSelectionVal);
                    
                })
            }
            if (element ==trans_nav_ul_li_a[1] ){
                // trans_nav_ul_li_a
                console.log("hello")
                // const transact__main = document.querySelectorAll(".transact__main");
                transact__main[0].classList.add("dspn");
                transact__main[1].classList.remove("dspn")
                transact__main[2].classList.add("dspn")
                transact__main[3].classList.add("dspn")
                // alert(Z)
                accountNumber
                console.log(transact__main[1].classList)
                const withdrawFunds = document.getElementById("withdrawFunds");
                withdrawFunds.addEventListener("click",async(e)=>{
                    e.preventDefault();
                    const withdrawalData = [];
                    const withdarwFrm = document.getElementById('accToWithdrawfrm').value;
                    const withdrawMethod = document.getElementById('withrawmethod').value;
                    const withdarwamnt = document.getElementById('withdrawamt').value;
                    const bankName = document.getElementById('bankName').value;
                    const routingNumber = document.getElementById('routingNumber').value;
                    const accountNumber = document.getElementById('accountNumber').value;
                    const accoutType = document.getElementById('accoutType').value;
                    withdrawalData.push(withdarwFrm);
                    withdrawalData.push(withdarwamnt);
                    withdrawalData.push(withdrawMethod);
                    withdrawalData.push(bankName);
                    withdrawalData.push(routingNumber);
                    withdrawalData.push(accountNumber);
                    withdrawalData.push(accoutType);

                    const data = withdrawalData;

                    // for (let i = 0; i < withdrawalData.length; i++) {
                    //     const element = withdrawalData[i];
                        // withdrawalData.forEach(data => {
                            // console.log(element)
                        // });
                        
                    // }
                    try {
                        const response = await fetch("/api/v1/transactions/withdrawFnds",{
                            method:"POST",
                            headers:{"Content-Type":"application/json"},
                            body:JSON.stringify({data}),
                        })
                        // console.log(data)
                        
                        const result =await response.json();
                        if (response.ok){
                            console.log(result)
                        }

                        else{
                            console.log(result)
                        }
                        
                    } catch (error) {
                        console.error(error);
                    }

                    function withdrawFunds() {
                        console.log("withdraw funds function called")
                        console.log(withdrawalData)
                        document.getElementById('accToWithdrawfrm').value = "";
                        document.getElementById('withrawmethod').value = "";
                        document.getElementById('withdrawamt').value = "";
                        document.getElementById('bankName').value = "";
                        document.getElementById('routingNumber').value = "";
                        document.getElementById('accountNumber').value = "";
                        document.getElementById('accoutType').value = "";
                        const withdScStyle = document.querySelectorAll(".withdScStyle");
                        withdScStyle[0].style.display = "none";
                        withdScStyle[1].style.display = "flex";
                        console.log(withdScStyle);
                    }
                    if (withdrawalData[2] && withdrawalData[3] && withdrawalData[4] && withdrawalData[5] ) {
                        withdrawFunds();    
                    }

                    // console.log(withdrawalData)
                    // alert("withdraw");
                })
            }
            if (element ==trans_nav_ul_li_a[2] ){
                // trans_nav_ul_li_a
                console.log("hello")
                
                // const transact__main = document.querySelectorAll(".transact__main");
                transact__main[0].classList.add("dspn");
                transact__main[1].classList.add("dspn")
                transact__main[2].classList.remove("dspn")
                transact__main[3].classList.add("dspn")
                const sendMoney = document.getElementById("sendMoney");
                sendMoney.addEventListener("click",async(e)=>{
                    e.preventDefault();
                    const accSelectio = document.getElementById("accSelectio").value;
                    const recVacctNumber = document.getElementById("recVacctNumber").value;
                    const howmuch = document.getElementById("sendAmount").value;
                    console.log(user.dataToFrontend[6])
                    const sendAmount = Math.trunc(howmuch)
                    const senderAvailBal = user.dataToFrontend[6];
                    console.log(sendAmount)
                    // const senderAcc = user.dataToFrontend[2]
                    if (accSelectio !== "none" && recVacctNumber != user.dataToFrontend[2]) {
                       if (sendAmount != 0) {
                             if ( senderAvailBal >= sendAmount) {
                            // alert(`from your : ${accSelectio} account To acc: ${recVacctNumber} amount to send : ${sendAmount}`);
                            document.querySelector(".err-text").classList.add("dspn");
                            // document.getElementById("accSelectio").value = "";
                            document.getElementById("recVacctNumber").value ="";
                            document.getElementById("sendAmount").value ="";
                            const sendMonWtFrm = document.getElementById("sendMonWtFrm");
                            const sendMonNoFrm = document.getElementById("sendMonNoFrm");
                            const amountSent = document.querySelector(".amountSent");
                            const rcvAccNo = document.querySelector(".rcvAccNo");
                            const rcvrFncl = document.querySelector(".rcvrFn");
                            const rcvrLncl = document.querySelector(".rcvrLn");
                           
                            const sndrBal = document.getElementById("sndrBal");
                            const transactionType = 'debit'
                            console.log(sndrBal);
                            let userBala =user.dataToFrontend[6];
                            // there need to be some correction for the below if-statement, we need to get the sender balanace from the backend then store it in a locsl variable called userBala to continue with the flow
                            if(sndrBal){
                                sndrBal.innerHTML = userBala;
                            }
                            const data={
                                accSelectio:accSelectio,
                                recVacctNumber:recVacctNumber,
                                sendAmount:sendAmount,
                                transactionType:transactionType,
                                userBala:senderAvailBal
                            }
                            try{
                                const response = await fetch("/api/v1/transactions/debit",{
                                    method:"POST",
                                    headers:{"Content-Type":"application/json"},
                                    body:JSON.stringify({data}),
                                })
                                const result =await response.json();
                                if (response.ok){
                                    const rcvrFn = document.getElementById("rcvrFn");
                                    const rcvrLn = document.getElementById("rcvrLn");
                                    const rcvrAccNo = document.getElementById("rcvrAccNo");
                                    const rcvrEmail = document.getElementById("rcvrEmail");
                                    const sendAmt = document.getElementById("sendAmt");
                                    const newBal = document.getElementById("newBal");
                                //   alert("ok!");
                                console.log(result)
                                   sendMonWtFrm.classList.add("dspn");  
                                //   // sndrBal.innerHTML = user.dataToFrontend[6];
                                const rcvrFirstName =result.dataTosend[3];
                                const rcvrLastName =result.dataTosend[4];
                                const rcvrEmailaddress = result.dataTosend[2];
                                const transacType = result.newTransaction.transactionType;
                                const accSelectio = result.newTransaction.accSelectio;
                                const balAftrTrans = userBala - result.newTransaction.sendAmount;
                                const rcvrAccount = result.newTransaction.recVacctNumber;
                                const rcvrBal = Number(result.dataTosend[0])
                                const newTransAmount = Number(result.newTransaction.sendAmount)
                                const rcvrBalAftTf = rcvrBal + newTransAmount;
    
                                const senderDetails = user.dataToFrontend;
                                const senderTransHistory = user.dataToFrontend[7];
                                const recverTransHistory = result.dataTosend[5];
    
                                  sendMonNoFrm.classList.remove("dspn")
                                  rcvrFn.innerHTML = rcvrFirstName;
                                  rcvrLn.innerHTML = rcvrLastName;
                                  rcvrEmail.innerHTML = rcvrEmailaddress;
                                  sendAmt.innerHTML =newTransAmount;
                                  newBal.innerHTML = balAftrTrans;
                                  rcvrAccNo.innerHTML = rcvrAccount;
    
                                  const sndtrsScript = `${newTransAmount} Debited from your ${accSelectio}, To account no:${rcvrAccount} account name:${rcvrFirstName} ${rcvrLastName} and your new balance is ${balAftrTrans}`;
                                  const rcvtrsScript = `${newTransAmount} : was credited from : ${senderDetails[0]} ${senderDetails[1]}, with account no:${senderDetails[2]} and your new balance is ${rcvrBalAftTf}`;
                                  recverTransHistory.push(rcvtrsScript);
                                  console.log(recverTransHistory)
    
                                  const transData = {
                                    rcvrFirstName:rcvrFirstName,
                                    rcvrLastName:rcvrLastName,
                                    rcvrEmailaddress:rcvrEmailaddress,
                                    newTransAmount:newTransAmount ,
                                    balAftrTrans:balAftrTrans,
                                    rcvrAccount:rcvrAccount,
                                    rcvrBalAftTf:rcvrBalAftTf,
                                    sndtrsScript:sndtrsScript,
                                    rcvtrsScript:rcvtrsScript,
                                    transacType:transacType,
                                    accSelectio:accSelectio,
                                    senderDetails:senderDetails,
                                }
                                console.log(result.dataTosend);
                                  
                                  const sendMoneyCancelbtn = document.getElementById("sendMoneyCancelbtn");
                                  sendMoneyCancelbtn.addEventListener('click',(e)=>{
                                    sendMonWtFrm.classList.remove("dspn");  
                                  sendMonNoFrm.classList.add("dspn")
                                  });
                                   const sendMoneyConfirmbtn = document.getElementById("sendMoneyConfirmbtn");
                                   const sendMonOtpFrm = document.getElementById("sendMonOtpFrm");
                                   sendMoneyConfirmbtn.addEventListener('click',async(e)=>{
                                    e.preventDefault;
                                    try {
                                        const response = await fetch("/api/v1/transactions/postOtp",{
                                            method:"POST",
                                            headers:{"Content-Type":"application/json"},
                                            body:JSON.stringify({transData}),
                                        })
                                        const result = await response.json();
                                        console.log(result);
                                        if(!response.ok){
                                            // 319096297
                                            console.log(`something went wrong please try again later`);
                                        }
                                        if(response.ok){
                                            // 319096297
    
                                            // this is where i am (i am suppose to create an otpverification endpoint to match otp and complete transaction)
                                            console.log(result);
                                            const sendMoneyOtpCancelbtn = document.getElementById("sendMoneyOtpCancelbtn");
                                            if(sendMoneyOtpCancelbtn){
                                                sendMoneyOtpCancelbtn.addEventListener("click",(e)=>{
                                                    e.preventDefault;
                                                    // alert("hey")
                                                    sendMonOtpFrm.classList.add("dspn")
                                                    sendMonNoFrm.classList.remove("dspn");  
            
                                                })
                                            }
                                            const sendMoneyOtpConfirmbtn = document.getElementById("sendMoneyOtpConfirmbtn");
                                            const err = document.getElementsByClassName("err-text");
                                            if(sendMoneyOtpConfirmbtn){
                                                sendMoneyOtpConfirmbtn.addEventListener("click",async(e)=>{
                                                    e.preventDefault;
                                                    // alert("hey")
                                                    // sendMonOtpFrm.classList.add("dspn")
                                                    // sendMonNoFrm.classList.remove("dspn");  
                                            // const newData = {
                                            //     result:result
                                            // }
                                                    
                                                     const tfOtpInpt = document.getElementById("tfOtpInpt").value;
                        
                                                 if (tfOtpInpt !== undefined && tfOtpInpt !== "" && tfOtpInpt !== null) {
                                                    console.log(result.rqbdy.transData);
                                                    const rqbdy = result.rqbdy.transData;
                                                    const newData = {
                                                        rqbdy:rqbdy,
                                                        tfOtpInpt:tfOtpInpt
                                                    }
                                                    document.getElementById("tfOtpInpt").value = "";
                                                    try {
                                                        const response = await fetch("/api/v1/transactions/confirmOtp",{
                                                            method:"POST",
                                                            headers:{"Content-Type":"application/json"},
                                                            body:JSON.stringify({newData}),   
                                                        })
                                                        const result = await response.json();
                                                        if (!response.ok) {
                                                            // console.log(result.message);
                                                            err[1].classList.remove("dspn");
                                                            err[1].innerHTML = "Wrong Otp";
                                                            console.log(err[1].innerHTML);
                                                        }
                                                        if (response.ok) {
                                                            console.log(result);
                                                            // prfBal.innerHTML = result.balAftrTrans;
                                                            // localStorage.setItem("user",JSON.stringify(result))
                                                            sendMonOtpFrm.classList.add("dspn");
                                                            err[1].classList.add("dspn");
                                                            amountSent.innerHTML = result.newTransAmount;
                                                            rcvAccNo.innerHTML = result.rcvrAccount;
                                                            rcvrFncl.innerHTML = result.rcvrFirstName;
                                                            rcvrLncl.innerHTML = result.rcvrLastName;
                                                            const TfCompleted = document.getElementById("TfCompleted");
                                                            TfCompleted.classList.remove("dspn");
                                                            if (user && user.dataToFrontend[2] === result.senderDetails[2]) {
                                                                // console.log(user)
                                                                user.dataToFrontend[6] = result.balAftrTrans;
                                                                // user.dataToFrontend[7] = history;
                                                                localStorage.setItem("user",JSON.stringify(user))
                                                                prfBal.innerHTML =user.dataToFrontend[6];

                                                            }
                                                            const clTfCfrmBtn = document.getElementById("clTfCfrmBtn");
                                                            clTfCfrmBtn.addEventListener("click",(e)=>{
                                                                location.href = "transaction.html";
                                                            })
                                                        }
                                                        
                                                    } catch (error) {
                                                        console.error(error);
                                                    }
                                                  
                                                 }
                                                })
                                            }
                                        }
                                        
                                     } catch (error) {
                                        console.error(error)
                                    }
    
                                    sendMonNoFrm.classList.add("dspn")
                                    sendMonOtpFrm.classList.remove("dspn");  
                                  })
                                }
                                else {
                                    // alert("not ok!");
                                    
                            document.querySelector(".err-text").innerHTML = "something went wrong"
                            document.querySelector(".err-text").classList.remove("dspn");
                                    // console.log(result)
                                    // errtext
                                }
                            } catch (error) {
                                console.error(error);
                            }
    
                            // console.log(sendMonNoFrm);
                        
                            
                               }
                        
                              else{
                            // alert("insufficient funds")    
                            
                             document.querySelector(".err-text").innerHTML = "insufficcient balance";
                             document.querySelector(".err-text").classList.remove("dspn");
                  
                            return false;
                            }
                       }
                       else{
                        document.querySelector(".err-text").innerHTML = "Invalid Amount";
                        document.querySelector(".err-text").classList.remove("dspn");

                       }
                    }
                    else if(accSelectio === "none"){
                        // console.log(accSelectio,recVacctNumber,sendAmount)
                        document.querySelector(".err-text").innerHTML = "Select Your Account";
                        document.querySelector(".err-text").classList.remove("dspn");
                    }
                    else if(recVacctNumber==null || recVacctNumber==""|| recVacctNumber==user.dataToFrontend[2] ){
                        // console.log(accSelectio,recVacctNumber,sendAmount)
                        if(recVacctNumber==null){
                            document.querySelector(".err-text").innerHTML = "Account not Valid";
                            document.querySelector(".err-text").classList.remove("dspn");

                        }
                        if( recVacctNumber==""){
                            document.querySelector(".err-text").innerHTML = "Please Enter Account ";
                            document.querySelector(".err-text").classList.remove("dspn");

                        }
                        if(recVacctNumber==user.dataToFrontend[2]){
                            document.querySelector(".err-text").innerHTML = " Can't send to yourself";
                            document.querySelector(".err-text").classList.remove("dspn");

                        }
                    }
                    else if(sendAmount==null || sendAmount==""){
                        // console.log(accSelectio,recVacctNumber,sendAmount)
                        document.querySelector(".err-text").innerHTML = "please enter amount";
                        document.querySelector(".err-text").classList.remove("dspn");
                    }
                    else{
                        document.querySelector(".err-text").innerHTML = "Something went Wrong";
                        document.querySelector(".err-text").classList.remove("dspn");
                   
                    }
                });
            }

            if (element ==trans_nav_ul_li_a[3] ){
                // trans_nav_ul_li_a
                console.log("hello")
                // const transact__main = document.querySelectorAll(".transact__main");
                transact__main[0].classList.remove("dspn");
                transact__main[1].classList.add("dspn")
                transact__main[2].classList.add("dspn")
                transact__main[3].classList.add("dspn")
                console.log(transact__main[0].classList)
            }
            else{
                
                // const transact__main = document.querySelectorAll(".transact__main");
                // transact__main[0].classList.remove("dspn");
                // transact__main[1].classList.add("dspn")
                // transact__main[2].classList.add("dspn")
                // transact__main[3].classList.add("dspn")
                // transact__main[1].classList.add("dspn")
                console.log(transact__main);
            }
        })
    });
    
}
const Pfname= document.getElementById("Pfname");
const Plname = document.getElementById("Plname");
const accNo = document.getElementById("accNo");
if (!user) {
    // window.location.href="login.html";
        // if (Pfname|| Plname || accNo || prfBal || prfBalPrf) {
        //     Pfname.innerHTML = null;
        //     Plname.innerHTML = null;
        //     accNo.innerHTML = null;
        //     prfBal.innerHTML = null;
        // }    
     
}
else if(user){
    // window.location.href="profile.html";
    // alert("user insigned")
    let frm = Pfname|| Plname || accNo || prfBal || prfBalPrf
    if (Pfname) {
    Pfname.innerHTML = user.dataToFrontend[0];

    }
    if (Plname) {
    Plname.innerHTML = user.dataToFrontend[1];
        
    }
    if (accNo) {
    accNo.innerHTML = user.dataToFrontend[2];
    }
    

    if (prfBal) {
        
        prfBal.innerHTML = user.dataToFrontend[6];
        if (prfBalPrf) {
            for (let i = 0; i < prfBalPrf.length; i++) {
                const element = prfBalPrf[i];
                element.innerHTML = user.dataToFrontend[6];
                // prfBalPrf[1].innerHTML = user.dataToFrontend[6];
                
            }
            
        // prfBalPrf[0].innerHTML = user.dataToFrontend[6];
        // prfBalPrf[1].innerHTML = user.dataToFrontend[6];
        }
        // user.dataToFrontend[6] = user.dataToFrontend[6] || newBal;
        console.log(user.dataToFrontend[7])
        if (user.dataToFrontend[7]) {
            const transactionList =  user.dataToFrontend[7]
            const transaction__item_desc = document.getElementById("transaction");
          
            // const trans = 
           if(transaction__item_desc){
            transaction__item_desc.innerHTML = "";
            // let history = []
            let index;
            for (i = 0; i < transactionList.length; i++) {
                index= i;
                const transaction = transactionList[i];
                history.push(transaction)

                console.log(history[i].txnId);
                  
                
            }
            console.log(history)
            history.forEach(txn=>{
                let row= `
                <ul style="margin:4% auto;padding:4% ;background: black;font-size:.99rem;box-shadow:0px 1px 6px white;color:white;width:89%">
                <li class="trULliClass"><span class="trLiSpn">Id: </span> <span class="trDtClass"> ${txn.txnId}</span></li>
                <li class="trULliClass"><span class="trLiSpn">Amount: </span> <span class="trDtClass"> ${txn.txnAmt}</span></li>
                <li class="trULliClass"><span class="trLiSpn">Type: </span> <span class="trDtClass">${txn.txnType}</span></li>
                <li class="trULliClass"><span class="trLiSpn">Date: </span> <span class="trDtClass">${txn.txnDate}</span></li>
                <li class="trULliClass"><span class="trLiSpn">Account No: </span><span class="trDtClass"> ${txn.txnSAcc}</span></li>

                </ul>
                `;
                transaction__item_desc.innerHTML +=row;
            })
            if (history.length < 1) {
                 transaction__item_desc.innerHTML = `<h2 style="font-size:2rem;color:white;text-align:center">0 history here</h2>`;
                
            }
            // console.log(`Transaction history =  ${history[index].txnId}`);

           }
            
        }

        
    // }
    // else{
        console.log("ter")
    }
    else{
        console.log("jemsdfe")
    }
    
        
}

const createNewAcc = document.getElementById("createAcc");
if(createNewAcc){
    createNewAcc.addEventListener("submit",async(e)=>{
        e.preventDefault();
        const createNewAccData = [];
        console.log(createNewAccData)
        const accType = document.getElementById("accType").value;
        const dob = document.getElementById("dob").value;
        const initdeposit = 0;
        const address = document.getElementById("address").value;
        const ssn = document.getElementById("ssn").value;
        const fname =user.dataToFrontend[0];
        const lname=user.dataToFrontend[1];;
        const email=user.dataToFrontend[3];;
        createNewAccData.push(accType,dob,initdeposit,ssn)
       const accDetails = {
        accType:accType,
        dob:dob,
        address:address,
        initdeposit:initdeposit,
        ssn:ssn,
        fname:fname,
        lname:lname,
        email:email
       }
       document.getElementById("accType").value="savings";
       document.getElementById("dob").value="";
       document.getElementById("address").value="";
       document.getElementById("ssn").value="";
        console.log(accDetails)
        if( accDetails.accType && accDetails.dob && accDetails.ssn){
            try {
                
                
                const response = await fetch("/api/v1/accounts/createbankacc", {
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({accDetails}),
                    })
                const result =await response.json();
                
            } catch (error) {
                console.error(error);
            }

        }
    
    })
}




const lgOutbtn = document.getElementById("lgOut");
if(lgOutbtn){
    lgOutbtn.addEventListener("click",(e)=>{
        e.preventDefault();
        // alert("logging out user now!");
        localStorage.removeItem('user');
        window.location.href="/login.html";
    });

}




