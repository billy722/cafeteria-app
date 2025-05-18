import React from 'react';

type Props = {
    onSelect: (table: String) => void;
}

const mesas = ['Mesón', 'Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4', 'Mesa 5', 'Mesa 6', 'Mesa 7', 'Mesa 8'];

export default function TableSelector({ onSelect }: Props){
    return(

        <div>
            <h2>Seleccione Mesa:</h2>
            {mesas.map((mesa) => (
                <button
                    key={mesa}
                    onClick={() => onSelect(mesa)}
                    style={{
                        margin: '10px',
                        padding: '10px 20px',
                        fontSize: '16px',
                        cursor: 'pointer',
                    }}
                >
                    {mesa}
                </button>
            ))}
        </div>

    );
}