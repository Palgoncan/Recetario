export const environment = {
    production: false,
    firebaseConfig : {
        apiKey: "AIzaSyBun4OOKcUEDg5-xOj3C698__TVpwnosUA",
        authDomain: "recetario-2b37b.firebaseapp.com",
        projectId: "recetario-2b37b",
        storageBucket: "recetario-2b37b.appspot.com",
        messagingSenderId: "1007079753805",
        appId: "1:1007079753805:web:dd6b4c9fc70405b3c2f404",
        measurementId: "G-09VCZ4FTCM"
    },
    api:{
        natiolalities:'www.themealdb.com/api/json/v1/1/list.php?a=list',
        categories:'www.themealdb.com/api/json/v1/1/list.php?c=list',
        listByCategory:'www.themealdb.com/api/json/v1/1/filter.php?c=',
        listByNationality:'www.themealdb.com/api/json/v1/1/filter.php?a=',
        viewRecipe:'www.themealdb.com/api/json/v1/1/lookup.php?i='
    }
};
