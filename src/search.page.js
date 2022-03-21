import React from "react"
import { useNavigate } from "react-router-dom"
import './search.page.css'

export const SearchPage = () => {
    const navigate = useNavigate();
    const [addresses, setAddresses] = React.useState(['', ''])
    return (
        <div className="search">
            <div className="page">
                <div className="search-wrapper">
                    <div className="m24">Enter your locations to find convenient places</div>

                    {
                        addresses.map((address, index) => {
                            return <div key={`address-${index}`} className="row"><input className='input' type='text' placeholder='Address' value={address} onChange={(event) => {
                                const newAddresses = [...addresses];
                                newAddresses[index] = event.currentTarget.value;
                                setAddresses([...newAddresses]);
                            }} />{index > 1 && <div className="pointer" onClick={() => {
                                const newAddresses = [];
                                for (var i = 0; i < addresses.length; i++) {
                                    if (i !== index) {
                                        newAddresses.push(addresses[i]);
                                    }
                                }
                                setAddresses([...newAddresses]);
                            }}>Remove</div>}</div>
                        })
                    }
                    <div className="m24 pointer" onClick={() => {
                        setAddresses([...addresses, ''])
                    }}>+ Add another address</div>
                    <button className='btn' type='button' onClick={() => {
                        navigate('/results')
                    }}>Search</button>
                </div>
            </div>
        </div>
    )
}