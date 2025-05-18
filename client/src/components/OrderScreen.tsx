import React from 'react';

type Props = {
    table: String;
    onBack: () => void;
};

export default function OrderScreen({table, onBack}: Props){
    return (
        <div>
            <h2>Pedido para: {table}</h2>
            <button onClick={onBack} style={{marginTop: '20px'}}>
                Volver
            </button>
        </div>
    );
}