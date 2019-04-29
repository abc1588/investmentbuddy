import React, {Component, Fragment} from 'react';
import axios from 'axios';
import './info.scss';
import {convertAccountData} from "../../helpers";
import RenderTable from '../../render_table/render_table';


class AccountInfo extends Component{

    constructor(props){
        super(props);

        this.state = {
            accountData: []
        }
    }

    componentDidMount() {
        console.log('info mounted');
        this.getAccountData();

    }

    getAccountData(){
        console.log('we getting here?')
        axios.get('/api/getaccountbalance.php').then(resp=>{

            console.log('account info resp:', resp);
            this.setState({
                accountData: resp.data
            })
        });
    }

    render(){
        if(!this.state){
            return;
        }


        console.log('account info state from render:',this.state);

        return(
            <Fragment>
                <div className='row'>
                    <div className="col s6 "><i className="material-icons">account_balance</i><b>Available</b></div>
                    <div className="col s5 left offset-s2">

                        <div>Balance:</div>
                        <div>To Trade:</div>
                        <b>Total</b>
                        <div>Assets:</div>
                    </div>
                    <div className="col s3">
                        <div className="">{this.state.accountData.avail_balance}</div>
                        <div className="">{this.state.accountData.avail_to_trade}</div>
                        <br/>
                        <div className="">{this.state.accountData.total_asset}</div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

export default AccountInfo;