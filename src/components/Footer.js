import React, { useContext } from "react";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Link from "@material-ui/core/Link";
import DcContext from "../contexts/dc-context";

export default function Footer() {
  const context = useContext(DcContext);
  return (
    <footer style={{ marginTop: "30px" }}>
      <Box
        px={{ xs: 3, sm: 10 }}
        py={{ xs: 5, sm: 10 }}
        bgcolor="text.secondary"
        color="white"
      >
        <Container maxWidth="lg">
          <Grid container spacing={5}>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>{["Help","Справка","Довiдка"][context.languageCode]}</Box>
              <Box>
                <Link href="/" color="inherit">
                {["Contact","Обратная связь","Зв'язок"][context.languageCode]}
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                {["Support","Поддержка","Пiдтримка"][context.languageCode]}
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                {["Privacy","Конфиденциальность","Конфіденційність"][context.languageCode]}
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>{["Navigate","Навигация","Навiгацiя"][context.languageCode]}</Box>
              <Box>
                <Link href="/" color="inherit">
                {["Clinics","Клиники","Клiнiки"][context.languageCode]}
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                {["Dentists","Стоматологи","Стоматологи"][context.languageCode]}
                </Link>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box borderBottom={1}>{["Language","Язык","Мова"][context.languageCode]}</Box>
              <Box>
                <Link href="/" color="inherit">
                {["English","Английский","Англiйська"][context.languageCode]}
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                {["Russian","Российский","Росiйcька"][context.languageCode]}
                </Link>
              </Box>
              <Box>
                <Link href="/" color="inherit">
                {["Ukrainian","Украинский","Українська "][context.languageCode]}
                </Link>
              </Box>
            </Grid>
          </Grid>
          <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
            Dental-Platform &reg; {new Date().getFullYear()}
          </Box>
        </Container>
      </Box>
    </footer>
  );
}
