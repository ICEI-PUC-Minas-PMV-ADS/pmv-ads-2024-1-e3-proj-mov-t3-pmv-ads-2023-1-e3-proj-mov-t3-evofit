import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Calendar } from 'react-native-calendars';
import { LocaleConfig } from 'react-native-calendars';
import { getDoc, getDocs, collection, doc } from 'firebase/firestore';
import { db, auth } from '../config/firebaseconfig';
import { differenceInHours, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { useNavigation } from '@react-navigation/native';

// Configuração do idioma para português
LocaleConfig.locales['pt-br'] = {
  monthNames: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
  monthNamesShort: ['Jan.', 'Fev.', 'Mar.', 'Abr.', 'Mai.', 'Jun.', 'Jul.', 'Ago.', 'Set.', 'Out.', 'Nov.', 'Dez.'],
  dayNames: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
  dayNamesShort: ['Dom.', 'Seg.', 'Ter.', 'Qua.', 'Qui.', 'Sex.', 'Sáb.'],
};
LocaleConfig.defaultLocale = 'pt-br';

export default function Home({ route }) {
  const [markedDates, setMarkedDates] = useState({});
  const [hoursRemaining, setHoursRemaining] = useState(null);
  const [lastTraining, setLastTraining] = useState('Nenhum treino realizado recentemente');
  const [trainingFrequency, setTrainingFrequency] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    fetchTrainingDays();
    fetchTrainingRecords();
  }, []);

  const fetchTrainingRecords = async () => {
    try {
      const user = auth.currentUser;
      const userId = user.uid;

      const userDocRef = doc(db, 'RegistroTreino', userId);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();
        const trainingDays = userData.DiaTreinado || [];

        const newMarkedDates = {};
        trainingDays.forEach(date => {
          newMarkedDates[date] = { marked: true, dotColor: 'green' };
        });

        setMarkedDates(prevDates => ({ ...prevDates, ...newMarkedDates }));
        fetchLastTraining(userData);
        calculateTrainingFrequency(trainingDays);
        checkTodayIsTrainingDay(trainingDays);
      } else {
        console.log("Documento do usuário não encontrado");
      }
    } catch (error) {
      console.log("Erro ao buscar dados de treino do Firestore: ", error);
    }
  };

  const fetchTrainingDays = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "DiasTreino"));
      let trainingDays = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          trainingDays = doc.data().diasTreino;
        }
      });
      markTrainingDays(trainingDays);
      checkTodayIsTrainingDay(trainingDays);
    } catch (error) {
      console.log("Erro ao buscar dados do Firestore: ", error);
    }
  };

  const markTrainingDays = (trainingDays) => {
    const newMarkedDates = {};
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // Janeiro é 0

    for (let month = 1; month <= 12; month++) {
      const daysInMonth = new Date(currentYear, month, 0).getDate();
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, month - 1, day);
        const dayOfWeek = date.getDay(); // 0 = Domingo, 1 = Segunda, etc.
        const dateString = date.toISOString().split('T')[0];

        if (trainingDays.includes(dayOfWeek)) {
          newMarkedDates[dateString] = { marked: true, dotColor: '#ffA500' };
        } else if (dayOfWeek === 0 || dayOfWeek === 6) {
          newMarkedDates[dateString] = { marked: true, dotColor: '#c0c0c0' };
        }
      }
    }
    setMarkedDates(prevDates => ({ ...prevDates, ...newMarkedDates }));
  };

  const checkTodayIsTrainingDay = (trainingDays) => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    if (trainingDays.includes(dayOfWeek)) {
      const now = new Date();
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999); // Define o horário final do dia como 23:59:59:999
      const remainingHours = differenceInHours(endOfDay, now);
      setHoursRemaining(remainingHours);
    }
  };

  const fetchLastTraining = async (userData) => {
    try {
      const lastTrainingName = userData.NomeTreinoRealizado;
      setLastTraining(lastTrainingName ? lastTrainingName : 'Nenhum treino realizado recentemente');
    } catch (error) {
      console.log("Erro ao buscar o último treino: ", error);
    }
  };

  const calculateTrainingFrequency = async (trainingDays) => {
    try {
      const user = auth.currentUser;
      const userId = user.uid;

      const startOfMonthDate = startOfMonth(new Date());
      const endOfMonthDate = endOfMonth(new Date());

      const daysOfMonth = eachDayOfInterval({ start: startOfMonthDate, end: endOfMonthDate });

      const totalWeeks = Math.ceil(daysOfMonth.length / 7);
      const totalTrainingDaysExpected = totalWeeks * 5; // Supondo 5 dias de treino por semana

      const userDocRef = doc(db, 'RegistroTreino', userId);
      const userDoc = await getDoc(userDocRef);

      let totalTrainingDaysActual = 0;
      if (userDoc.exists()) {
        const userData = userDoc.data();
        const trainingDays = userData.DiaTreinado || [];
        totalTrainingDaysActual = trainingDays.filter(date => {
          const trainingDate = new Date(date);
          return trainingDate >= startOfMonthDate && trainingDate <= endOfMonthDate;
        }).length;
      }

      let frequency = 0;
      if (totalTrainingDaysActual > 0) {
        frequency = (totalTrainingDaysActual / totalTrainingDaysExpected) * 100;
      }

      setTrainingFrequency(frequency.toFixed(2));
    } catch (error) {
      console.log("Erro ao calcular a frequência de treino: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarContainer}>
        <Calendar markedDates={markedDates} />
      </View>
      <View style={styles.legendContainer}>
        <View style={styles.legendColumn}>
          <View style={styles.legendItem}>
            <View style={[styles.legendSquare, { backgroundColor: '#ffA500' }]} />
            <Text style={styles.legendText}>Dias de Treino</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendSquare, { backgroundColor: 'green' }]} />
            <Text style={styles.legendText}>Treino realizado</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendSquare, { backgroundColor: '#c0c0c0' }]} />
            <Text style={styles.legendText}>Folga</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomContentContainer}>
        <View style={styles.lastTrainingContainer}>
          <Text style={styles.lastTrainingTitle}>Último Treino</Text>
          <Text style={styles.lastTrainingText}>{lastTraining}</Text>
        </View>
        {hoursRemaining !== null && hoursRemaining >= 0 ? (
          <View style={styles.notificationContainer}>
            <View style={styles.notificationContent}>
              <View style={styles.notificationBox}>
                <Text style={styles.notificationTitle}>Hoje você tem treino!</Text>
                <Text style={styles.notificationText}>Faltam {hoursRemaining} horas para você treinar</Text>
                <TouchableOpacity style={styles.trainButton} onPress={() => navigation.navigate('Treinar', route.params)}>
                  <Text style={styles.trainButtonText}>Treinar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.notificationContainer}>
            <View style={styles.notificationContent}>
              <View style={styles.notificationBox}>
                <Text style={styles.notificationTitle}>Hoje é seu dia de descanso!</Text>
                <Text style={styles.notificationText}>Renove sua energia</Text>
              </View>
            </View>
          </View>
        )}
      </View>
      <View style={styles.scoreContainer}>
        <Text style={styles.notificationTitle}>Desafio do mês</Text>
        {trainingFrequency >= 80.00 ? (
          <Image source={require('../assets/medalha-de-ouro.png')} style={{ width: 50, height: 50 }} />
        ) : (
          <Image source={require('../assets/medalha-de-ouro_outline.png')} style={{ width: 50, height: 50 }} />
        )}
        <Text style={styles.notificationText}>Frequência: {trainingFrequency}%</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: 60,
  },
  calendarContainer: {
    marginTop: 20,
    width: '100%',
  },
  legendContainer: {
    flexDirection: 'row',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  legendColumn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  legendSquare: {
    width: 20,
    height: 20,
    marginRight: 3,
  },
  legendText: {
    marginRight: 5,
  },
  bottomContentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
    width: '100%',
  },
  notificationContainer: {
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    width: '60%',
  },
  notificationContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  notificationBox: {
    alignItems: 'center',
  },
  notificationTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  notificationText: {
    textAlign: 'center',
    marginBottom: 10,
  },
  trainButton: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  trainButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  scoreContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
  lastTrainingContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '40%',
    alignItems: 'center',
    marginRight: 20,
  },
  lastTrainingTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  lastTrainingText: {
    textAlign: 'center',
  },
});
