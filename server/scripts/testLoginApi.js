import axios from 'axios';

const testLogin = async () => {
    try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
            email: 'usamawaleed83@gmail.com',
            password: 'admin123'



        });
        console.log('✅ Login API Response:', response.data);
    } catch (error) {
        if (error.response) {
            console.log('❌ Login API Error:', error.response.status, error.response.data);
        } else {
            console.log('❌ Login API Error:', error.message);
        }
    }
};

testLogin();
