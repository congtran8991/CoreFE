import { Breadcrumbs, Link, Typography } from "@mui/material";
import { Link as RouterLink, useLocation } from "react-router-dom";

function formatLabel(segment: string) {
  // Bạn có thể customize để đẹp hơn
  if (!segment) return "Trang chủ";
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

const BreadcrumbsNav = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        margin: 2,
        fontFamily: "Times",
        fontWeight: 700,
        fontSize: "1.2rem",
      }}
    >
      <Link
        component={RouterLink}
        to="/"
        underline="hover"
        color="#cb8609"
        sx={{
          "&:hover": {
            color: "#cb8609", // không đổi màu khi hover
          },
        }}
      >
        Trang chủ
      </Link>

      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography
            key={to}
            sx={{
              fontFamily: "Times",
              fontWeight: 700,
              fontSize: "1.2rem",
            }}
          >
            {formatLabel(value)}
          </Typography>
        ) : (
          <Link
            component={RouterLink}
            underline="hover"
            color="#cb8609"
            sx={{
              "&:hover": {
                color: "#cb8609", // không đổi màu khi hover
              },
            }}
            to={to}
            key={to}
          >
            {formatLabel(value)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadcrumbsNav;
