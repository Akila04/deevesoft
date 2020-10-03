import React,{Component} from 'react';
import fire from './fire';
import axios from 'axios';
import './styles.css';
import logo from './deeve-logo-white.png'
import swal from 'sweetalert';

class Secondpage extends Component{
    constructor(){
        super();
        this.state={
            name:'',
            id:'',
            categoryid:'',
            categoryname:'',
            photourl:'',
            loading:false,
            error:{
                name:"",
                categoryname:'',
                photourl:''
            },
        }
    }

    changeHandler = (e) =>{
        const {id,value}=e.target;
        let {error}=this.state;
        const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

        switch(id){
            case "name":
                if(value!==""){
                    if(typeof(value) !== "undefined"){
                        if(!value.match(/^[a-zA-Z ]+$/)){
                        error.name= "**** Invalid name ****";
                        }  
                        else{
                            error.name=""; 
                        }      
                    }
                }
                else{
                    error.name=""; 
                }
                break;
            case "categoryname":
                if(value!==""){
                    if(typeof(value) !== "undefined"){
                        if(!value.match(/^[a-zA-Z ]+$/)){
                        error.categoryname= "**** Invalid category name ****";
                        }  
                        else{
                            error.categoryname=""; 
                        }      
                    }
                }
                else{
                    error.categoryname=""; 
                }
                break;   
            case "photourl":
                if(value!==""){
                    if(!regexp.test(value)){
                        error.photourl="**** Invalid URL ****";
                    }
                    else{
                        error.photourl="";
                    }
                }
                else{
                    error.photourl=""; 
                }   
                break; 
        }
        this.setState({error,[id]:value});
    }

    submitHandler = (e) =>{
        e.preventDefault();
        this.setState({loading:true});
        document.getElementById("submitbutton").disabled=true;
        var phurl=[];
        phurl[0]=this.state.photourl;
        const data={
            id:this.state.id,
            category:{
                id:this.state.categoryid,
                name:this.state.categoryname
            },
            name:this.state.name,
            photoUrls:phurl,
            tags:[{id: 0,name: "string"}],
            status:"available"
        }
        axios.post("https://petstore.swagger.io/v2/pet",
            {header:{
                'Content-Type': 'application/json',
                'Accept':'application/xml'
            }},
            data
        )
        .then((res) =>{
            console.log(res);
            if(res.status == 200){
                this.getresponseid(res.data);
            }
        })
        .catch((err) => {
            console.log(err);
            this.setState({message:'unable to store pet details',loading:false});
            document.getElementById("submitbutton").disabled=false;
        })

    }

    getresponseid = (res) =>{
        const responseid=res.id;
        const url = "https://petstore.swagger.io/v2/pet/"+responseid;
        axios.get(url)
            .then((res) =>{
                //swal("Pet details were stored successfully");
                swal({
                    title: "Good job!",
                    text: "Pet details were stored successfully",
                    icon: "success",
                  });
                this.setState({loading:false});
                document.getElementById("submitbutton").disabled=false;
                })
            .catch((err)=>{
                console.log(err);
                //swal("pet not found");
                swal({
                    title: "Oops!",
                    text: "pet not found",
                    icon: "error",
                  });
                this.setState({loading:false})
                document.getElementById("submitbutton").disabled=false;
            })
    }

    logout = () =>{
        localStorage.removeItem("username");
        fire.auth().signOut();
    }

    render(){
        const username=localStorage.getItem("username");
        return(
            <div>
                <header className="header">
                    <div className="row">
                        <div className="col-sm-4">
                        <p className="logo">
                            <img src={logo} width="120" height="50"></img>
                        </p>
                        </div>
                        <div className="col-sm-4">
                            <h2 className="heading">PET STORE</h2>
                        </div>
                        <div className="col-sm-4">
                        <div className="username">
                        <p>{username}</p>
                        <p className="logout">
                            <a href="#" onClick={()=>{this.logout()}}>
                            logout
                            </a>
                        </p>
                        </div>
                        </div>
                    </div> 
                      
                </header>
                <br />
                <div>
                <form onSubmit={(e)=>{this.submitHandler(e)}} autoComplete="off">
                    <p  className="heading_petdetails">Enter pet details</p>
                    <input 
                        type="text" id="name" placeholder="Enter Name" value={this.state.name}
                        onChange={(e)=>{this.changeHandler(e)}} className="inputfield" required
                    />
                    <p className="errormsg">{this.state.error.name}</p>
                    
                    <input 
                        type="number" id="id" placeholder="Enter Id" value={this.state.id}
                        onChange={(e)=>{this.changeHandler(e)}} className="inputfield" required
                    />
                    <p className="errormsg"></p>
                    
                    <input 
                        type="text" id="categoryname" placeholder="Enter Category Name" value={this.state.categoryname}
                        onChange={(e)=>{this.changeHandler(e)}} className="inputfield" required
                    />
                    <p className="errormsg">{this.state.error.categoryname}</p>
                    
                    <input 
                        type="number" id="categoryid" placeholder="Enter Category Id" value={this.state.categoryid}
                        onChange={(e)=>{this.changeHandler(e)}} className="inputfield" required
                    />
                    <p className="errormsg"></p>
                    
                    <input 
                        type="text" id="photourl" placeholder="Enter Photo URL" value={this.state.photourl}
                        onChange={(e)=>{this.changeHandler(e)}} className="inputfield" required
                    />
                    <p className="errormsg">{this.state.error.photourl}</p>
                    
                    <button id="submitbutton" onSubmit={(e)=>{this.submitHandler(e)}} className="submit_button">
                        SUBMIT
                    </button>
                </form>
                </div>
                {this.state.loading ? <div class="spinner-border"></div> :<p></p>}
                <br /><br />
                
            </div>
        );
    }
}

export default Secondpage;