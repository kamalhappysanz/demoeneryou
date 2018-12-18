import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import { Line } from 'rc-progress';
import StarRatingComponent from 'react-star-rating-component';

import Rating  from 'react-rating';
import 'font-awesome/css/font-awesome.min.css'

import progress_img from './images/progress_home.png';
import character_2 from './images/character_form_2.png';
import electric_img from './images/house_int.png';
import electric_board from './images/electric_board.png';
import electric_symbol from './images/electric_symbol.png';

import select from './images/select.png';
import unselect from './images/unselect.png';

class Persondetail extends Component {
    constructor(props){
        super(props)
        this.state = {
            step :2,
            person:localStorage.getItem('person_count'),
            power_consumption:'',
            power_val:'',
            star_errors:'',
      
           
        };
    }

    handleValidation(){
        let fields = this.state.fields;
        let errors = {};
        let formIsValid = true;
        let star_val=localStorage.getItem('person_count');        
        let power_val=this.power_consumption.value;  
       
        if(star_val=='0' || star_val==null){
            formIsValid = false;
            this.setState({ star_errors: "Select the Person" });         
         } 

         if(power_val==''){
            formIsValid = false;
            this.setState({ power_error: "Power Error" }); 
         }


        this.setState({errors: errors});
        return formIsValid;

    }


      continue = e => {
        e.preventDefault();       
        if(this.handleValidation()){        
            this.props.nextStep();         
           
        }else{
            alert("error");
        }
        
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }
   
    handleRate (rate) {
        this.setState({ person: rate });
        localStorage.setItem("person_count",rate);
      }
  
    render() {
        const { rating_half_star,person } = this.state;
        const { values } = this.props

    return (
        <div className="container-fluid wrapper">
        <Header/>
        <div className="container">
        <h4 className="form_heading">My Electricity Demand  </h4>
        <form>

                {/* Form section starts here */}
                <div className="row">
                    <div className="col-md-2">
                    <div className="form_char_img">
                        <img src={character_2} className=""/>
                     </div>
                    </div>
                    <div className="col-md-8 text-center" style={ { backgroundImage: 'url(' + electric_img + ')',
                 backgroundPosition: 'center',
                 backgroundSize: 'cover',
                 height:'417px',
                 backgroundRepeat: 'no-repeat' } }>

                    <div className="p_box">
                        <div className="p_form_label">
                        Personenanzahl
                        
                        </div>
                        <span className="p_icon"> 
                       
<Rating name="person"  stop={6} initialRating={localStorage.getItem('person_count')}
 emptySymbol={<img src={unselect} className="icon" />}
 fullSymbol={<img src={select} className="icon" />}
  onChange={rate => this.handleRate(rate)}
/>
                    
                                        </span>
                    <div className="p_form_label" style={{borderLeft:'3px solid #2171b9'}}>{person}</div>
                    
                    </div>
                    <p style={{marginTop:'20px'}} className="error_font">{this.state.star_errors}</p>


                       
                            
                    </div>
                    <div className="col-md-2">
                    <p className="text-center">Power <br></br> Consumption</p>
                                <div className="" style={{backgroundImage: 'url(' + electric_board + ')',
                 backgroundPosition: 'center',
                backgroundSize:'contain',
                 height:'250px',
                 backgroundRepeat: 'no-repeat' }}>
                 
                 <div className="power_meter_box">
                        <input type="text" name="power_consumption" className="power_consumption" minLength="5" maxLength='5'
                         placeholder='power_consumption' ref={(power_consumption) => this.power_consumption = power_consumption}
                         onChange={this.props.handleChange('power_consumption')}
                         defaultValue={values.power_consumption} />                                
                    </div>
                   
                   
                           
                 <div className="electric_symbol_class">
                    <img src={electric_symbol} circle className="blink-image"/>
                 </div>
                            
                            
                            </div>
                            <p style={{textAlign:"center"}} className="error_font">{this.state.power_error}</p>
                    </div>
                </div>
                {/* Form section Ends here */}



                {/* Progress Bar section Starts here */}
                <div className="row progress_section">
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
                    <img src={progress_img} className="" circle  style={ { position:'relative',top:'12px',left:'50%'}} />
                     <Line percent="53" strokeWidth="1" trailColor="" strokeColor="#2171b9" strokeLinecap="square" className="progress_bar_line"/>
                     <p style={{color:'#000',marginLeft:'49%'}}>50%</p>
                </div>
                </div>
                <div className="col-md-2 text-center">    
                <div className="next_section">
                        <button onClick={this.continue} className="btn btn_next pull_right">Next  </button>
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

export default Persondetail;