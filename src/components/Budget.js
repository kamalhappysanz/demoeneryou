import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Line } from 'rc-progress';
import 'font-awesome/css/font-awesome.min.css'

import progress_img from './images/progress_home.png';
import character_4 from './images/character_form_4.png';
import euro_icon from './images/euro_icon.png';
import form_bg_3 from './images/form_3_bg.png';



class Budget extends Component {
    constructor(props){
        super(props)
        this.state = {
            step :3,
                   
           
        };
    }
   
 

 

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
    
    continue = e => {
        e.preventDefault();
        this.props.nextStep();    
       
        
    }
  

    render() {
        // const { rating } = this.state;
        const { values } = this.props
       
   


        return (
        <div className="container-fluid wrapper">
        <Header/>
        <div className="container">
        <h4 className="form_heading">My Personal Preference </h4>
        <form>

                {/* Form section starts here */}
                <div className="row" >
                    <div className="col-md-2">
                        <img src={character_4} className="character_4"/>
                    </div>
                    <div className="col-md-8 text-center" style={ { backgroundImage: 'url(' + form_bg_3 + ')',
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 height:'417px',
                 backgroundRepeat: 'no-repeat' } }>

                  <div className="">
                    <div className="row energy_form">
                        <p className="budget_font">Budgetobergrenze (€)</p>
                        <div className="budget_icon">
                            <img src={euro_icon} circle className="coin_img" id="coin_spin"/>   
                        </div>
                        <div className="budget_box">
                            <input type="text" name="budget_value" onChange={this.props.handleChange('budget_value')} className="budget_price" placeholder='Price' />
                        </div>
                        <div className="form_btn">
                            <button  onClick={this.continue}  className="btn btn_submit">Speichern</button>
                        </div>
                      

                       
                       
                    </div>
                  </div>


                       
                            
                    </div>
                    <div className="col-md-2">
                 
                    
                   
                    </div>
                </div>
                {/* Form section Ends here */}



                {/* Progress Bar section Starts here */}
                <div className="row progress_section"  style={{marginTop:'50px'}}>
                <div className="col-md-2">
                    <div className="char_next_btn_section">
                            <div className="">
                               
                                <div className="back_btn_form_2">
                                <button onClick={this.back} className="btn btn_next pull_right">Back  </button>
                                </div>
                        </div>              

                
                      
                     
                    </div>
                        
                </div>
                <div className="col-md-8">
                <div className="progress_bar">                   
                    {/* <button onClick={this.continue} className="btn  btn_next pull_left">Back   </button> */}
                    <img src={progress_img} className="" circle  style={ { position:'relative',top:'12px',left:'97%'}} />
                     <Line percent="100" strokeWidth="1" trailColor="" strokeColor="#2171b9" strokeLinecap="square" className="progress_bar_line"/>
                     <p style={{color:'#000',marginLeft:'99%'}}>100%</p>
                </div>
                </div>
                <div className="col-md-2 text-center">    
                <div className="next_section">
                        {/* <button onClick={this.continue} className="btn btn_next pull_right">Next  </button> */}
                </div>                 
               
                </div> 
                </div>
               
                {/* Progress Bar section Ends here */}

         </form>
         </div>
        <Footer/>
        </div>
    );
}
}

export default Budget;