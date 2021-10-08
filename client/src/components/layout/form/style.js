import { makeStyles} from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';
import grey from '@material-ui/core/colors/grey';
export default makeStyles({
    root: {
        display: 'flex',
      },
      container: {
        alignContent:'center',
        alignItems:'center',
        padding:'5%'
      },
      inputs:{
          width:'75%',
          marginLeft:'10%'
      },
      chips:{
        width:'75%',
        marginLeft:'10%',
        marginTop:'3%'
    },
      grid:{
          marginTop:'5%',
      },
      gridBotton:{
          marginLeft:'10%',
          marginTop:'10%',
          marginBottom:'10%'
      },
      img:{
          marginLeft:'25%',
          marginTop:'2%'
      }, 
      label:{
        marginLeft: '20px',
        fontStyle: 'normal',
        fontWeight: '400',
        fontSize: '12px',
        lineHeight: '16px',
        letterSpacing: '0.4px',
        color: 'rgba(0, 37, 99, 0.6)',
        fontFamily:'Titillium Web'

    },
      textField:{
        width: '100%',
        marginTop: '5px',
    },
      Botton:{
          backgroundColor:blueGrey[400],
          width:'75%',
          marginLeft:'10%'
      },
      header:{
            backgroundColor:grey[100]
      },  
      gridGustos:{
        boxShadow: " 0 0 20px",
        width: "100%", 
        marginTop: "50px",  
        marginBottom: "2%", 
        backgroundColor:"eeebeb"
      }
})