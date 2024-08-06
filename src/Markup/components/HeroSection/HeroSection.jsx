import background from "../../../assets/img/bank.jpg";
import { Box, Typography, Grid } from "@mui/material";

function HeroSection() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        mt: { xs: 12, md: 0 }, // Add margin top for mobile only
      }}
    >
      <section
        id="hero"
        className="d-flex align-items-center container-fluid justify-content-center"
      >
        <Box
          className="container"
          data-aos="fade-up"
          sx={{
            width: "90vw",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Grid className="hero-container" container spacing={4}>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: { xs: "center", md: "left" },
                width: { xs: "100%", md: "450px" }, // Fixed width for medium and larger screens
                mx: { xs: "auto", md: 0 }, // Center the text on small screens
              }}
            >
              <Typography
                variant="h2"
                sx={{ fontSize: { xs: "2rem", md: "2rem" }, color: "#D02149" }}
              >
                CPO, Cheque, Cash Collection and Delivery service
              </Typography>

              <Typography
                className="hero-description"
                variant="body1"
                sx={{ fontSize: { xs: "1rem", md: "1rem" }, mt: 2 }}
              >
                Z-Doorstep Banking service is a solution that renders CPO, cash,
                and check collection services to a specified address without
                compromising the safety of your money. Zemen Bank will pick up
                your money and deposit it into your account while issuing
                deposit slips on site. Furthermore, your money will earn a high
                interest rate each day at Zemen Bank while deposited in a saving
                account. Delivery and pick up orders can be placed via email,
                fax, and telephone.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                  marginTop: 4,
                }}
              ></Box>
            </Grid>
            <Grid
              item
              xs={12}
              md={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                src={background}
                alt="Brain"
                style={{ width: "100%", height: "auto" }}
              />
            </Grid>
          </Grid>
        </Box>
      </section>
    </Box>
  );
}

export default HeroSection;
