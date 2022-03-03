import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemService from '../services/ItemService';
import { FaCheckCircle, FaTimesCircle , FaReceipt, FaEdit , FaTrashAlt, FaCartPlus} from 'react-icons/fa';


class ItemListComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
            items: [],
            totalRegularBill: '',
            totalDiscountedBill: ''

        }

        // this.addItem = this.addItem.bind(this);
        // this.updateItem = this.updateItem.bind(this);
        // this.deleteItem = this.deleteItem.bind(this);
        // this.generateBill = this.generateBill.bind(this);
        this.isDiscounted = this.isDiscounted.bind(this);
    }

    isDiscounted(item) {
        if (item == true) {
            return <FaCheckCircle />
        } else {
            return <FaTimesCircle />
        }
    };

    componentDidMount() {
        ItemService.getItems().then((res) => {
            this.setState({ items: res.data });
        });
    }

    // addItem() {
    //     this.props.history.push('/add-item');
    // }

    // updateItem(itemName) {
    //     this.props.history.push(`/update-item/${itemName}`);
    // }

    // deleteItem(itemName) {
    //     ItemService.deleteItem(itemName).then(res => {
    //         this.setState({ item: this.state.items.filter(item => item.itemName !== itemName) });
    //         window.location.reload(false);
    //     });
    // }

    generateBill() {
        this.props.history.push('/bill');
    }

    refreshPage() {
        window.location.reload(false);
    }

    render() {
        return (
            <div className='container '>
                <br />
                <h4 className='text-center bold-text'>Items List</h4><br />

                <div className='row'>
                    <table className='text-center bord   table table-hover   '>

                        <thead className='background-color thead-text'>
                            <tr>
                                <th>Name</th>
                                <th>Discounted</th>
                                <th>% Discount</th>
                                <th>Regular Price</th>
                                <th>Discounted Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody className='font'>
                            {
                                this.state.items.map(
                                    item =>
                                        <tr key={item.itemName}>
                                            <td>{item.itemName}</td>
                                            <td>{this.isDiscounted(item.isDiscounted)}</td>
                                            {/* <td>{JSON.stringify(item.isDiscounted)}</td> */}
                                            <td>{item.discountPercentage} %</td>
                                            <td>₱ {item.itemPrice}</td>
                                            <td>₱ {item.discountedPrice}</td>
                                            <td>
                                                <button onClick={() => this.updateItem(item.itemName)} className="btn-action"><FaEdit /></button>
                                                &nbsp;&nbsp;&nbsp;&nbsp;
                                                <button onClick={() => this.deleteItem(item.itemName)} className="btn-action"><FaTrashAlt /></button>
                                            </td>

                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                </div><br />
                <div>
                    <button className='btn-add' onClick={this.addItem}><FaCartPlus /> Add New Item</button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button className='btn-add' onClick={this.generateBill}><FaReceipt /> Generate Bill</button>
                </div>
            </div>
        );
    }
}

export default ItemListComponent;