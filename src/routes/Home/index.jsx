import './styles.scss'

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { logOut } from '../../hooks/useAuth';
import { getReadings } from '../../hooks/useReadings';

import ButtonDefault from '../../components/ButtonDefault';

import { Chart as ChartJS, defaults } from 'chart.js/auto';
import { Bar, Pie, Doughnut, Line } from 'react-chartjs-2';

defaults.plugins.legend.labels.usePointStyle = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = 'start';
defaults.plugins.title.font.size = 20;
defaults.plugins.title.font.weight = 700;
defaults.plugins.title.font.family = 'Poppins, Arial, Helvetica, sans-serif';
defaults.plugins.title.color = '#FFFFFF';

function Home() {
  const navigate = useNavigate();

  const [readings, setReadings] = useState([]);

  const [data, setData] = useState([]);
  const [dataDoughnut, setDataDoughnut] = useState([]);

  useEffect(() => {
    const sessionObj = JSON.parse(sessionStorage.getItem('teste'));
    let getSession = true;
    if (sessionObj) {
      if (addHours(new Date(), -1) > new Date(sessionObj.dateGetReadings)) {
        getSession = false;
      }
    }
    else {
      getSession = false;
    }

    if (getSession) {
      setReadings(sessionObj.listReadings);
    }
    else {
      getReadings().then((res) => {
        const listReadings = [];
        Object.keys(res).forEach(id => {
          listReadings.push(res[id]);
        });

        sessionStorage.setItem('teste', JSON.stringify({ dateGetReadings: new Date().toJSON(), listReadings }));
        setReadings(listReadings);

        return;
      })
    }
  }, []);

  useEffect(() => {
    const data = [];
    const days = readings.map(e => new Date(e.dt_leitura).toLocaleDateString()).filter((value, index, array) => array.indexOf(value) === index);
    days.forEach((day) => {
      const listTemp = readings.filter(e => new Date(e.dt_leitura).toLocaleDateString() === day).map(e => e.temperatura);
      const listTurb = readings.filter(e => new Date(e.dt_leitura).toLocaleDateString() === day).map(e => e.turbidez);

      const medTemp = (parseFloat(listTemp.reduce((partialSum, e) => partialSum + parseFloat(e), 0)) / listTemp.length).toFixed(2);
      const medTurb = (parseFloat(listTurb.reduce((partialSum, e) => partialSum + parseFloat(e), 0)) / listTurb.length).toFixed(2);

      data.push({ day, medTemp, medTurb });
    });
    setData(data);



    const listTempDoughnut = readings.map(e => e.temperatura);
    const listTurbDoughnut = readings.map(e => e.turbidez);
    setDataDoughnut({
      medTemp: (parseFloat(listTempDoughnut.reduce((partialSum, e) => partialSum + parseFloat(e), 0)) / listTempDoughnut.length).toFixed(2),
      medTurb: (parseFloat(listTurbDoughnut.reduce((partialSum, e) => partialSum + parseFloat(e), 0)) / listTurbDoughnut.length).toFixed(2)
    });
  }, [readings]);

  function addHours(date, hours) {
    const hoursToAdd = hours * 60 * 60 * 1000;
    date.setTime(date.getTime() + hoursToAdd);
    return date;
  }

  function handleLogOut() {
    logOut().then(() => {
      navigate('/Login');
    });
  }

  return (
    <div id='home-page'>
      {/* <ButtonDefault text='Sair' onClick={handleLogOut} /> */}
      {
        !!readings ? (
          <div id="all-charts">
            <div>
              <Bar
                data={{
                  labels: data.map(e => e.day),
                  datasets: [
                    {
                      label: 'Temperatura (ºC)',
                      data: data.map(e => e.medTemp),
                      borderRadius: 5,
                    },
                    {
                      label: 'Turbidez (%)',
                      data: data.map(e => e.medTurb),
                      borderRadius: 5
                    }
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      text: 'Média Diária',
                    }
                  }
                }}
              />
            </div>
            <div>
              <Line
                data={{
                  labels: data.map(e => e.day),
                  datasets: [
                    {
                      label: 'Temperatura (ºC)',
                      data: data.map(e => e.medTemp),
                    },
                    {
                      label: 'Turbidez (%)',
                      data: data.map(e => e.medTurb),
                    }
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      text: 'Média Diária',
                    }
                  }
                }}
              />
            </div>
            <div className='all-columns'>
              <Doughnut
                data={{
                  labels: ['Temperatura (ºC)', 'Turbidez (%)'],
                  datasets: [
                    {
                      label: 'Geral',
                      data: [dataDoughnut.medTemp, dataDoughnut.medTurb]
                    }
                  ],
                }}
                options={{
                  plugins: {
                    title: {
                      text: 'Média Geral',
                    }
                  }
                }}
              />
            </div>
          </div>
        ) : (
          <div></div>
        )
      }
    </div>
  )
}

export default Home;