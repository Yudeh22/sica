import React from 'react';
import { Item, Segment } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

const ShowPrediction = ({predictedData}) => {
    return (
        <Segment circular className='item-predict' style={{ width: '400px', padding: '10px' }}>
            <Item.Group>
                <Item>
                    <Item.Image size='tiny' circular src='' />
                    <Item.Content>
                        <Item.Header content={predictedData.Product} />
                        <Item.Description>
                            Probabilidad: {predictedData.Probability * 10} % 
                        </Item.Description>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
    );
};

export default ShowPrediction;


