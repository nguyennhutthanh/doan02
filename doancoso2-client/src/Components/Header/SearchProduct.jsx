import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const BaseURL = "https://localhost:44336/api/Products/";

const SearchProduct = () => {

    const [product, setProduct] = useState([])
    const [text, setText] = useState('')
    const [suggestions, setSuggestions] = useState([])

    useEffect(() => {
        const loadDataSearch = async () => {
            const response = await axios.get(BaseURL + "GetAllSanPham")
                .catch((err) => console.error(err))
            setProduct(response.data)
        }
        loadDataSearch();
    }, [])

    const headlineSearch = (text) => {
        let matches = []
        if (text.length > 0) {
            matches = product.filter(product => {
                const regex = new RegExp(`${text}`, "gi");
                return product.tenSP.match(regex) || product.danhmucNavigation.tenLoai.match(regex);
            })
        }
        setSuggestions(matches)
        setText(text)
    }
    return (
        <>
            <div style={{
                width: '12.5pc', marginRight: '22.5pt', position: 'relative'
            }}>
                <input type="text" placeholder="Tìm kiếm..." className="ui-autocomplete-input"
                    onChange={e => headlineSearch(e.target.value)}
                    style={{
                        background: ' #e5e5e5',
                        borderRadius: '11px', width: '208px', height: '36px', border: 'none', padding: '0px 0px 0px 14px'
                    }}
                    value={text}
                />
                <div style={{ position: 'absolute', width: '104%', marginTop: '10px' }}>
                    {
                        suggestions && suggestions.map((suggestions, i) =>
                            <Link to={`/DetailProduct/${suggestions.id}`}>
                                <div key={i} className="justify-content-md-center map-search"
                                    style={{
                                        marginBottom: '4px', background: ' #e5e5e5', borderRadius: '11px', padding: '2px 0px 2px 10px',
                                    }}
                                >
                                    <Link to={`/DetailProduct/${suggestions.id}`}
                                        style={{ fontWeight: '500' }}
                                    ><i class="fa fa-search ml-1"></i> {suggestions.tenSP}</Link>
                                    <div style={{ paddingLeft: '29px' }}>
                                        Trong:
                                        <Link className="text-primary" to={`/Products/${suggestions.danhmucNavigation.id}`}> <i>{suggestions.danhmucNavigation.tenLoai}</i></Link>
                                    </div>
                                </div>
                            </Link>
                        )}
                </div>
            </div>
        </>
    );
};

export default SearchProduct;