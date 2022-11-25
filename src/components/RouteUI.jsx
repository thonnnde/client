import React, { useState } from 'react';
import { Carousel, Container, Row } from 'react-bootstrap';
import List from "../containers/ListContainer";
import MapUI from '../containers/MapUIContainer';

export default function RouteUI({routePlan}) {
 
  //Carousel 的State
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };


  return (
    <span className='fullSpan'>
      <div className="outer"
        style={{
          padding: "25px 100px 75px",
          width: "100%",
          // height: "100%",
          // content: "",
          clear: 'both',
          display: 'table'
        }}>
        <div
          style={{
            display: 'inline-block',
            width: '75%',
            // textAlign: 'center'
          }}>
          {/* <MapBoard listId={index} list={routePlan[index] }>map</MapBoard> */}
          <MapUI>map</MapUI>
        </div>
        <div
          style={{
            display: 'inline-block',
            width: '25%',
            height: '600px',
            verticalAlign: 'top',
            // height: '100%',
          }}>
          <Carousel fade activeIndex={index} onSelect={handleSelect} interval={null}>
            {routePlan.map((list, index) => (<Carousel.Item key={index}>
              <div style={{
                padding: '10px 50px 75px',
                height: '600px',
                backgroundColor: '#ACACAC',
                verticalAlign: 'top',
              }}>
                <Container fluid className="board p-1">
                  <Row className="m-0">
                    <List
                      key={index}
                      list={list}
                      listId={index}
                    />
                  </Row>
                </Container>
              </div>
            </Carousel.Item>))}
          </Carousel>
        </div>
      </div>
    </span >
  );
}