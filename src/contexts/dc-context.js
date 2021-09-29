import { createContext, useEffect, useState } from "react";

const DcContext = createContext({
  appointments: [],
  clients: [],
  clinics: [],
  dentists: [],

  addAppointment: (appointment) => {},
  updAppointment: (appointment) => {},

  addClient: (client) => {},
  updClient: (client) => {},

  selectedClinic: {},
  selectedDentist: {},

  selectClinic: (clinic) => {},
  selectDentist: (dentist) => {},
});

export function DcContextProvider(props) {
  const api = "https://localhost:44328/api/";

  const [userAppointments, setUserAppointments] = useState([]);
  const [userClients, setUserClients] = useState([]);
  const [userClinics, setUserClinics] = useState([]);
  const [userDentists, setUserDentists] = useState([]);
  const [userSelectedClinic, setUserSelectedClinic] = useState({});
  const [userSelectedDentist, setUserSelectedDentist] = useState({});

  useEffect(() => {
    async function fetchClinics() {
      let clinics = await fetch(api + "clinics");
      clinics = await clinics.json();
      setUserClinics(clinics);
    }
    async function fetchClients() {
      let clients = await fetch(api + "clients");
      clients = await clients.json();
      setUserClients(clients);
    }
    async function fetchAppointments() {
      let appointments = await fetch(api + "appointments");
      appointments = await appointments.json();
      setUserAppointments(appointments);
    }
    async function fetchDentists() {
      let dentists = await fetch(api + "dentists");
      dentists = await dentists.json();
      setUserDentists(dentists);
    }
    fetchAppointments();
    fetchClients();
    fetchClinics();
    fetchDentists();
  }, []);

  function addAppointmentHandler(appointment) {
    fetch(api + "appointments", {
      method: "POST",
      body: JSON.stringify(appointment),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setUserAppointments((prev) => {
          return prev.concat(json);
        });
      });
  }
  function updAppointmentHandler(appointment) {
    fetch(api + "appointments/" + appointment.id, {
      method: "PUT",
      body: JSON.stringify(appointment),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setUserAppointments((prev) => {
        return prev.map((a) => {
          return a.id === appointment.id ? appointment : a;
        });
      });
    });
  }

  function addClientHandler(client) {
    fetch(api + "clients", {
      method: "POST",
      body: JSON.stringify(client),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setUserClients((prev) => {
          return prev.concat(json);
        });
      });
  }
  function updClientHandler(client) {
    fetch(api + "clients/" + client.id, {
      method: "PUT",
      body: JSON.stringify(client),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      setUserClients((prev) => {
        return prev.map((c) => {
          return c.id === client.id ? client : c;
        });
      });
    });
  }

  function selectClinicHandler(clinic) {
    setUserSelectedClinic(clinic);
  }
  function selectDentistHandler(dentist) {
    setUserSelectedDentist(dentist);
  }

  const context = {
    appointments: userAppointments,
    clients: userClients,
    clinics: userClinics,
    dentists: userDentists,

    addAppointment: addAppointmentHandler,
    updAppointment: updAppointmentHandler,

    addClient: addClientHandler,
    updClient: updClientHandler,

    selectedClinic: userSelectedClinic,
    selectedDentist: userSelectedDentist,

    selectClinic: selectClinicHandler,
    selectDentist: selectDentistHandler,
  };

  return (
    <DcContext.Provider value={context}>{props.children}</DcContext.Provider>
  );
}

export default DcContext;
