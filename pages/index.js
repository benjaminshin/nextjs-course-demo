// our-domain.com/

import {MongoClient}from "mongodb";
import {Fragment, useContext } from "react";
import MeetupList from "../components/meetups/MeetupList";
import Head from "next/head";

// const DUMMY_MEETUPS=[
// {
//     id:'m1' ,
//     title:'A First Meetup' ,
//     image:'https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Liquid_Robustness_%282389440494%29.jpg/1024px-Liquid_Robustness_%282389440494%29.jpg' ,
//     address: 'Looking at the north side of False Creek with the Graville St. Bridge looming overhead.',
//     description: "This is a first meetup!"
// },
// {
//     id:'m2' ,
//     title:'A Second Meetup' ,
//     image:'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/BC_Place_and_Canoe_Bridge.jpg/800px-BC_Place_and_Canoe_Bridge.jpg' ,
//     address: 'Image of BC Place and Canoe Bridge taken in 2014.',
//     description: "This is a second meetup!"
// },
// {
//     id:'m3' ,
//     title:'A Third Meetup' ,
//     image:'https://upload.wikimedia.org/wikipedia/commons/5/57/Concord_Pacific_Master_Plan_Area.jpg?download' ,
//     address: 'Area of the master plan for Yaletown that was worked on after the 86 expo by Arthur Erickson, Barry Downs, etc.',
//     description: "This is a third meetup!"
// },

// ];



function HomePage(props){
    
    return (
<Fragment>
<Head>
<title>React Meetups</title>
<meta 
name='description'
content='Browse a huge list of highly active React Meetups!!'
/>
</Head>
<MeetupList meetups={props.meetups}/>
</Fragment>

    
    
    );
}

// export async function getServerSideProps(context){
// const req= context.req;
// const res= context.res;

//     return {
// props:{
//     meetups:DUMMY_MEETUPS}

//     };
// }

 export async function getStaticProps(){
// fetch data from an API

const client= await MongoClient.connect('mongodb+srv://benjaminshin:shs158792@cluster0.qukwx.mongodb.net/meetups?retryWrites=true&w=majority');
const db= client.db();
const meetupsCollection= db.collection('meetups');
const meetups= await meetupsCollection.find().toArray();

client.close();
 

     return {
props:{
    meetups:meetups.map(meetup=>({
title:meetup.title,
address:meetup.address, 
image: meetup.image,
id: meetup._id.toString(),
    })
    )
},
revalidate:36000

    };
};

export default HomePage;