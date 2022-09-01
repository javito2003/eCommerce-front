import React from 'react'

const ProductPlaceholder = () => {
    return (
        <div className="card m-3" style={{ width: "18rem" }}>
            <div className="card-body">
                <h5 className="card-title placeholder-glow"></h5>
                <p className="card-text placeholder-glow">
                    <span className="placeholder col-7"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-4"></span>
                    <span className="placeholder col-6"></span>
                    <span className="placeholder col-8"></span>
                </p>
                <div className="d-flex justify-content-end">
                    <button className='btn btn-info' disabled>Buy now</button>
                </div>
            </div>
        </div>
    )
}

export default ProductPlaceholder