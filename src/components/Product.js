import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';

import product_1 from './images/product_1.png';
import product_2 from './images/product_2.png';
import product_3 from './images/product_3.png';
import graph_img_1 from './images/graph_img_1.png';
import graph_img_2 from './images/graph_img_2.png';
import graph_img_3 from './images/graph_img_3.png';



class Product extends Component {

    constructor(props){
        super(props)
        this.state = {
            step :5,
            status:'',
            recommentations_value:[],
            systemCombinations_value:[],
        };
    }

    back = e => {
        e.preventDefault();
        this.props.prevStep();
    }

    componentDidMount(){
        const {values: {roof_inclination,living_area,post_code,directionChange,construction_year,person_count,power_consumption,energy_demand,yearlyGasDemand,yearlyEnergyDemand,yearlyEnergyDemandOnWater,budget_value }} = this.props;
        let local_person_count = localStorage.getItem('person_count');
      
      console.log("loading");

    //   var data = {
    //     "building": {
    //         "postalCode": 20146,
    //         "constructionYear": "FROM1969_TO1978",
    //         "livingSpace": 150,
    //         "roofAlignment": "SOUTH",
    //         "roofTilt": "DEGREES_25"
    //     },
    //     "energyDemand": {
    //         "personCount": 3,
    //         "energyDemand": 3004,
    //         "headingDemandType": "CONSTRUCTION_YEAR"
    //     }
    //   }

      if (energy_demand === 'CONSTRUCTION_YEAR'){

        var data = {
            "building": {
                "postalCode": post_code,
                "constructionYear": construction_year,
                "livingSpace": living_area,
                "roofAlignment": directionChange,
                "roofTilt": roof_inclination
            },
            "energyDemand": {
                "personCount": local_person_count,
                "energyDemand": power_consumption,
                "headingDemandType": energy_demand
            }
          }
      } 

      if (energy_demand === 'GAS_OR_OIL_BILL'){
        var data = {
            "building": {
                "postalCode": post_code,
                "constructionYear": construction_year,
                "livingSpace": living_area,
                "roofAlignment": directionChange,
                "roofTilt": roof_inclination
            },
            "energyDemand": {
                "personCount": local_person_count,
                "energyDemand": power_consumption,
                "headingDemandType": energy_demand,
                "yearlyGasDemand": yearlyGasDemand
            }
          }
      } 
      
      if (energy_demand === 'ENERGY_CERTIFICATE'){ 
        var data = {
            "building": {
                "postalCode": post_code,
                "roofAlignment": directionChange,
                "roofTilt": roof_inclination
            },
            "energyDemand": {
                "energyDemand": power_consumption,
                "headingDemandType": energy_demand,
                "yearlyEnergyDemand": yearlyEnergyDemand,
                "yearlyEnergyDemandOnWater": yearlyEnergyDemandOnWater
            }
          }
      }

            fetch("http://18.222.103.21:8080/eneryou/api/recommentations",{
                method: 'POST',
                body:JSON.stringify(data),
                headers: {
                    'content-type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                },
            })
            
            .then(response => {
                
                if (response.status === 200) {
                    console.log("loaded");
                    response.json().then(response_data => {
                     this.setState({ 
                            recommentations_value: response_data.recommentations, 
                            systemCombinations_value:response_data.systemCombinations,
                            loading: true 
                            });
                    });
                } else if (response.status === 400) {
                            response.json().then(response_data => {
                        // console.log(response_data);
                            this.setState({ 
                             });
                     });
                    alert("invalid input values")
                } else if (response.status === 500) {
                    response.json().then(response_data => {
                        // console.log(response_data);
                         this.setState({ 
                             });
                     });
                    alert("General internal problems")
                }
            })
                
            .catch((error) => {
                console.error(error);
             })
    }

    render(){
      
        let i = 0;
        let recommentations_list_1 =[];
        let recommentations_list_1_furthering=[];
        let recommentations_list_1_investCost=[];
        let recommentations_list_1_operatingCost=[];
        let recommentations_list_2 =[];
        let recommentations_list_2_furthering=[];
        let recommentations_list_2_investCost=[];
        let recommentations_list_2_operatingCost=[];
        let recommentations_list_3 =[];
        let recommentations_list_3_furthering=[];
        let recommentations_list_3_investCost=[];
        let recommentations_list_3_operatingCost=[];
        
        
        for (i = 0; i < this.state.recommentations_value.length; i++) {
            if (i === 0){
                //recommentations_list_1_type.push(this.state.recommentations_value[0].type);
                recommentations_list_1_furthering.push(this.state.recommentations_value[0].furthering);
                recommentations_list_1_investCost.push(this.state.recommentations_value[0].investCost);
                recommentations_list_1_operatingCost.push(this.state.recommentations_value[0].operatingCost);
                //recommentations_list_1_systemCombinationPosition.push(this.state.recommentations_value[0].systemCombinationPosition);
                let j = 0;
                let products_1 =[];
                products_1 = this.state.recommentations_value[0].products;
                for (j = 0; j < this.state.recommentations_value[0].products.length; j++) {
                        let componentName_1 = products_1[j]['componentName'];
                        //let logoPath_1 = products_1[j]['logoPath'];
                        let price_1 = products_1[j]['price'];
                        //let productCode_1 = products_1[j]['productCode'];
                        let productName_1 = products_1[j]['productName'];
                        recommentations_list_1.push(<tr><td>{componentName_1}</td><td>{productName_1}</td><td>{price_1} €</td></tr>);

                       
                    }
            }
             if (i == 1){
                //recommentations_list_2_type.push(this.state.recommentations_value[1].type);
                recommentations_list_2_furthering.push(this.state.recommentations_value[1].furthering);
                recommentations_list_2_investCost.push(this.state.recommentations_value[1].investCost);
                recommentations_list_2_operatingCost.push(this.state.recommentations_value[1].operatingCost);
                //recommentations_list_2_systemCombinationPosition.push(this.state.recommentations_value[1].systemCombinationPosition);
                
                let k = 0;
                let products_2 =[];
                products_2 = this.state.recommentations_value[1].products;
                for (k = 0; k < this.state.recommentations_value[1].products.length; k++) {
                        let componentName_2 = products_2[k]['componentName'];
                       // let logoPath_2 = products_2[k]['logoPath'];
                        let price_2 = products_2[k]['price'];
                       // let productCode_2 = products_2[k]['productCode'];
                        let productName_2 = products_2[k]['productName'];
                        // recommentations_list_2.push(<div className="row"><div className="col-md-4 col-sm-4"><p className="prod_res">{componentName_2}</p></div><div className="col-md-4 col-sm-4"><p className="prod_res">{productName_2}</p></div><div className="col-md-4 col-sm-4"><p className="prod_res">{price_2} € </p></div></div>);
                        recommentations_list_2.push(<tr><td>{componentName_2}</td><td>{productName_2}</td><td>{price_2} €</td></tr>);
                    }
            }
            if (i == 2){
                //recommentations_list_3_type.push(this.state.recommentations_value[2].type);
                recommentations_list_3_furthering.push(this.state.recommentations_value[2].furthering);
                recommentations_list_3_investCost.push(this.state.recommentations_value[2].investCost);
                recommentations_list_3_operatingCost.push(this.state.recommentations_value[2].operatingCost);
                //recommentations_list_3_systemCombinationPosition.push(this.state.recommentations_value[2].systemCombinationPosition);
                
                let l = 0;
                let products_3 =[];
                products_3 = this.state.recommentations_value[2].products;
                for (l = 0; l < this.state.recommentations_value[2].products.length; l++) {
                        let componentName_3 = products_3[l]['componentName'];
                        //let logoPath_3 = products_3[l]['logoPath'];
                        let price_3 = products_3[l]['price'];
                        //let productCode_3 = products_3[l]['productCode'];
                        let productName_3 = products_3[l]['productName'];
                        recommentations_list_3.push(<tr><td>{componentName_3}</td><td>{productName_3}</td><td>{price_3} €</td></tr>);
                    }
            } 
        }

            
            let graph_1=[];
            let graph_2=[];
			let graph_3=[];
			let graph_3_1=[];
			let graph_3_2=[];
			let graph_4=[];
			let graph_5=[];
            let graph_6=[];
            let graph_6_1=[];
            let graph_6_2=[];
			let graph_7=[];
			let graph_7_1=[];
			let graph_7_2=[];

            graph_1.push(['','Self Sufficiency']);
			for (i = 1; i < this.state.systemCombinations_value.length; i++) {
				    let systemCombinationPosition = String(this.state.systemCombinations_value[i].systemCombinationPosition);
				    let energeticValues = this.state.systemCombinations_value[i].energeticValues;
					let energeticSelfSufficiency = energeticValues['energeticSelfSufficiency'];	
					graph_1.push([systemCombinationPosition,energeticSelfSufficiency]);
            }
            
            graph_2.push(['', 'Self Sufficiency','Grid Consumption','Self Consumption-PV','Self Consumption-BHKW','Feed-In-PV','Feed-In-BHKW']);
            for (i = 1; i < this.state.systemCombinations_value.length; i++) {
                let systemCombinationPosition =  String(this.state.systemCombinations_value[i].systemCombinationPosition);
                let energeticValues = this.state.systemCombinations_value[i].energeticValues;
                let energeticSelfSufficiency = energeticValues['energeticSelfSufficiency'];
                let energeticNetConsumption = energeticValues['energeticNetConsumption'];
                if(energeticNetConsumption == null){energeticNetConsumption=0}
                let energeticOwnConsumptionPV = energeticValues['energeticOwnConsumptionPV'];
                if(energeticOwnConsumptionPV == null){energeticOwnConsumptionPV=0}
                let energeticOwnConsumptionBHKW = energeticValues['energeticOwnConsumptionBHKW'];
                if(energeticOwnConsumptionBHKW == null){energeticOwnConsumptionBHKW=0}
                let energeticPowerSupplyPV = energeticValues['energeticPowerSupplyPV'];
                if(energeticPowerSupplyPV == null){energeticPowerSupplyPV=0}
                let energeticPowerSupplyBHKW = energeticValues['energeticPowerSupplyBHKW'];
                if(energeticPowerSupplyBHKW == null){energeticPowerSupplyBHKW=0}
                graph_2.push([systemCombinationPosition,energeticSelfSufficiency,energeticNetConsumption,energeticOwnConsumptionPV,energeticOwnConsumptionBHKW,energeticPowerSupplyPV,energeticPowerSupplyBHKW]);
        }

            graph_3_1.push(['', 'Annuity Costs']);
			for (i =0; i < this.state.systemCombinations_value.length; i++) {
                    let systemCombinationPosition = String(this.state.systemCombinations_value[0].systemCombinationPosition);
                    let economicValues = this.state.systemCombinations_value[0].economicValues;
                    let annuityCost = economicValues['annuityCost'];
                    graph_3_1.push([systemCombinationPosition,annuityCost]);
                    break;
			}
			for (i = 1; i < this.state.systemCombinations_value.length; i++) {
				    let systemCombinationPosition = String(this.state.systemCombinations_value[i].systemCombinationPosition);
				    let economicValues = this.state.systemCombinations_value[i].economicValues;
					let annuityCost = economicValues['annuityCost'];
					graph_3_2.push([systemCombinationPosition,annuityCost]);
            }
            

            graph_4.push(['', 'annuityCost','Investment Costs','Budget']);
			for (i = 1; i < this.state.systemCombinations_value.length; i++) {
                    let budget_value_amount = Number(localStorage.getItem('budget_value'));
				    let systemCombinationPosition =  String(this.state.systemCombinations_value[i].systemCombinationPosition);
                    let economicValues = this.state.systemCombinations_value[i].economicValues;
                    let annuityCost = economicValues['annuityCost'];
                    let investCost = economicValues['investCost'];
					graph_4.push([systemCombinationPosition,annuityCost,investCost,budget_value_amount]);
            }


            graph_5.push(['', 'annuityCost','Fuel Costs', 'Maintenance Costs']);
			for (i = 1; i < this.state.systemCombinations_value.length; i++) {
				    let systemCombinationPosition = String(this.state.systemCombinations_value[i].systemCombinationPosition);
				    let economicValues = this.state.systemCombinations_value[i].economicValues;
					let annuityCost = economicValues['annuityCost'];
					let operatingCost = economicValues['operatingCost'];
					let yearlyFuelCost = economicValues['yearlyFuelCost'];
					graph_5.push([systemCombinationPosition,annuityCost,operatingCost,yearlyFuelCost]);
			}         

            graph_6_1.push(['', 'annuityCost','Electricity Costs', 'Heating Costs']);
			for (i = 0; i < this.state.systemCombinations_value.length; i++) {
				    let systemCombinationPosition = String(this.state.systemCombinations_value[i].systemCombinationPosition);
				    let economicValues = this.state.systemCombinations_value[i].economicValues;
					let annuityCost = economicValues['annuityCost'];
					let monthlyHeadingCost = economicValues['monthlyHeadingCost'];
					let monthlyEnergyCost = economicValues['monthlyEnergyCost'];
                    graph_6_1.push([systemCombinationPosition,annuityCost,monthlyHeadingCost,monthlyEnergyCost]);
                    break;
            }
			for (i = 1; i < this.state.systemCombinations_value.length; i++) {
				    let systemCombinationPosition = String(this.state.systemCombinations_value[i].systemCombinationPosition);
				    let economicValues = this.state.systemCombinations_value[i].economicValues;
					let annuityCost = economicValues['annuityCost'];
					let monthlyHeadingCost = economicValues['monthlyHeadingCost'];
					let monthlyEnergyCost = economicValues['monthlyEnergyCost'];
					graph_6_2.push([systemCombinationPosition,annuityCost,monthlyHeadingCost,monthlyEnergyCost]);
            }



            graph_7_1.push(['', 'CO2 Emission', 'CO2 Abatement Costs']);
			for (i = 0; i < this.state.systemCombinations_value.length; i++) {
				    let systemCombinationPosition =  String(this.state.systemCombinations_value[0].systemCombinationPosition);
				    let ecologicValues = this.state.systemCombinations_value[0].ecologicValues;
					let yearlyCO2Equivalent = ecologicValues['yearlyCO2Equivalent'];
					let yearlyAbatementCosts = ecologicValues['yearlyAbatementCosts'];	
					graph_7_1.push([systemCombinationPosition,yearlyCO2Equivalent,yearlyAbatementCosts]);
					break;
			}
			for (i = 1; i < this.state.systemCombinations_value.length; i++) {
				    let systemCombinationPosition =  String(this.state.systemCombinations_value[i].systemCombinationPosition);
				    let ecologicValues = this.state.systemCombinations_value[i].ecologicValues;
					let yearlyCO2Equivalent = ecologicValues['yearlyCO2Equivalent'];
					let yearlyAbatementCosts = ecologicValues['yearlyAbatementCosts'];	
					graph_7_2.push([systemCombinationPosition,yearlyCO2Equivalent,yearlyAbatementCosts]);
			}

			graph_1.sort(function(a,b){
					return b[1]  - a[1];
            })
 
            graph_2.sort(function(a,b){
                return b[1]  - a[1];
            })
            graph_2.map(function(val){
                 return val.splice(1, 1);
             });

           	graph_3_2.sort(function(a,b){
				return a[1]  - b[1];
			})
			graph_3 = graph_3_1.concat(graph_3_2);

			graph_4.sort(function(a,b){
				return a[1]  - b[1];
			})
            graph_4.map(function(val){
                return val.splice(1, 1);
            });

			graph_5.sort(function(a,b){
				return a[1]  - b[1];
			})
            graph_5.map(function(val){
                return val.splice(1, 1);
            });

			graph_6_2.sort(function(a,b){
				return a[1]  - b[1];
            })
            graph_6 = graph_6_1.concat(graph_6_2);
            graph_6.map(function(val){
                return val.splice(1, 1);
            });

			graph_7_2.sort(function(a,b){
				return a[1]  - b[1];
			})
            graph_7 = graph_7_1.concat(graph_7_2);
            

            localStorage.setItem("google_graph1", JSON.stringify(graph_1));
            localStorage.setItem("google_graph2", JSON.stringify(graph_2));
            localStorage.setItem("google_graph3", JSON.stringify(graph_3));
            localStorage.setItem("google_graph4", JSON.stringify(graph_4));
            localStorage.setItem("google_graph5", JSON.stringify(graph_5));
            localStorage.setItem("google_graph6", JSON.stringify(graph_6));
            localStorage.setItem("google_graph7", JSON.stringify(graph_7));
           
           
        return(
            <div className="container-fluid wrapper">
            <Header/>
                <div className="container">
                 <p>
                 <div className="back_btn_form_2">
                    <button onClick={this.back} className="btn btn_next pull_left">Back to Form </button>
                    </div>
                </p> <h4 className="form_heading">Product Recommendation  </h4>
                  <div className="row product_recommendation">
                        <div className="col-md-4 col-lg-4 col-sm-12">
                             <div className="product_img">
                                 <img  className="p_img" src={product_1} responsive />
                            </div>
                            <div class="table-responsive">
                            <table class="table table-borderless" responsive>
                                <thead className="product_box_1_2">
                                    <tr>
                                        <th scope="col" className="prod_res">Component</th>
                                        <th scope="col" className="prod_res">Product</th>
                                        <th scope="col" className="prod_res">Price</th>
                                    </tr>
                                </thead>
                                <tbody id="product_result_1" className="product_box_1_2">
                                    {recommentations_list_1}
                                </tbody>
                                <tbody id="product_result_1" className="product_box_1_3">
                                    <tr>
                                        <td></td>
                                        <td>Total Funding</td>
                                        <td>{recommentations_list_1_furthering} €</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>Investment Cost</td>
                                        <td>{recommentations_list_1_investCost} €</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>Operation Cost</td>
                                        <td>{recommentations_list_1_operatingCost} €</td>
                                    </tr>
                                </tbody>
                                <tbody className="graph_img">
                                    <td></td>
                                    <td>   <a href="/Economicgraph"><img className="graph_img"  src={graph_img_1} circle /></a></td>
                                    <td></td>
                                </tbody>
                            </table>
                            </div>
                            
                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12">
                      
                        <div class="table-responsive">
                        <div className="product_img">
                                 <img className="p_img" src={product_2} responsive />
                            </div>
                            <table class="table table-borderless">
                                <thead className="product_box_2_2">
                                    <tr>
                                        <th scope="col" className="prod_res">Component</th>
                                        <th scope="col" className="prod_res">Product</th>
                                        <th scope="col" className="prod_res">Price</th>
                                    </tr>
                                </thead>
                                <tbody id="product_result_1" className="product_box_2_2">
                                    {recommentations_list_2}
                                </tbody>
                                <tbody id="product_result_1" className="product_box_2_3">
                                    <tr>
                                        <td></td>
                                        <td>Total Funding</td>
                                        <td>{recommentations_list_2_furthering} €</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>Investment Cost</td>
                                        <td>{recommentations_list_2_investCost} €</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>Operation Cost</td>
                                        <td>{recommentations_list_2_operatingCost} €</td>
                                    </tr>
                                </tbody>
                                <tbody className="">
                                    <td></td>
                                    <td> <a href="/Emission"><img className="graph_img" src={graph_img_2} circle/></a></td>
                                    <td></td>
                                </tbody>
                            </table>
                            </div>

                        </div>
                        <div className="col-md-4 col-lg-4 col-sm-12">
                            <div className="product_img">
                                <img className="p_img" src={product_3} circle />
                            </div>
                            <div class="table-responsive">
                            <table class="table table-borderless">
                                <thead className="product_box_3_2">
                                    <tr>
                                        <th scope="col" className="prod_res">Component</th>
                                        <th scope="col" className="prod_res">Product</th>
                                        <th scope="col" className="prod_res">Price</th>
                                    </tr>
                                </thead>
                                <tbody id="product_result_1" className="product_box_3_2">
                                    {recommentations_list_3}
                                </tbody>
                                <tbody id="product_result_1" className="product_box_3_3">
                                    <tr>
                                        <td></td>
                                        <td>Total Funding</td>
                                        <td>{recommentations_list_3_furthering} €</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>Investment Cost</td>
                                        <td>{recommentations_list_3_investCost} €</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td>Operation Cost</td>
                                        <td>{recommentations_list_3_operatingCost} €</td>
                                    </tr>
                                </tbody>
                                <tbody className="graph_img">
                                    <td></td>
                                    <td><a href="/Energetic"><img className="graph_img"  src={graph_img_3} circle /></a></td>
                                    <td></td>
                                </tbody>
                            </table>
                            </div>
                           



                        </div>
                  </div>
                </div>
            <Footer/>
        </div>
        )
    }

}
export default Product;