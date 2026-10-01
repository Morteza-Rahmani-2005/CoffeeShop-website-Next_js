import Head from "next/head";
import Form from "react-bootstrap/Form";
import Layout from "@/components_dashboard/Layout";
import Button from "@/components_dashboard/ui/Button";
import PageHeader from "@/components_dashboard/ui/PageHeader";
import Panel from "@/components_dashboard/ui/Panel";
import formStyles from "@/components_dashboard/ui/form.module.css";
import styles from "@/pages/panel-dashboard/content/content.module.css";

const content = {
  siteName: "Diba Coffee House",
  heroTitle: "Great coffee, brewed with care.",
  heroSubtitle: "Order ahead, reserve a table, and skip the line.",
  ctaLabel: "Order Now",
  aboutText:
    "Diba Coffee House has been roasting small batches and serving the neighborhood since 2019. Every cup is brewed to order, from single-origin pour-overs to classic espresso drinks.",
  address: "128 Maple Street, Portland, OR",
  phone: "+1 (555) 214-7788",
  email: "hello@dibacoffee.com",
  openingHours: "Mon–Fri 7:00–20:00, Sat–Sun 8:00–21:00",
  instagram: "@dibacoffee",
};

export default function Content() {
  return (
    <>
      <Head>
        <title>Site Content</title>
      </Head>
      <Layout title="Site Content" subtitle="Edit the text shown on your public website">
        <Form>
          <PageHeader title="Site Content" subtitle="Changes appear on your storefront once saved.">
            <Button variant="ghost" type="button">
              Discard changes
            </Button>
            <Button variant="brew" type="button">
              <i className="bi bi-check2 me-1" /> Save content
            </Button>
          </PageHeader>

          <div className="row g-3">
            <div className="col-12 col-lg-7">
              <Panel className={styles.spaced}>
                <div className={styles.sectionTitle}>Homepage hero</div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Site name</Form.Label>
                  <Form.Control className={formStyles.control} name="siteName" defaultValue={content.siteName} />
                </div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Hero title</Form.Label>
                  <Form.Control className={formStyles.control} name="heroTitle" defaultValue={content.heroTitle} />
                </div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Hero subtitle</Form.Label>
                  <Form.Control className={formStyles.control} name="heroSubtitle" defaultValue={content.heroSubtitle} />
                </div>
                <div className={formStyles.row} style={{ marginBottom: 0 }}>
                  <Form.Label className={formStyles.label}>Call-to-action button label</Form.Label>
                  <Form.Control className={formStyles.control} name="ctaLabel" defaultValue={content.ctaLabel} />
                </div>
              </Panel>

              <Panel>
                <div className={styles.sectionTitle}>About section</div>
                <div className={formStyles.row} style={{ marginBottom: 0 }}>
                  <Form.Label className={formStyles.label}>About text</Form.Label>
                  <Form.Control as="textarea" rows={5} className={formStyles.control} name="aboutText" defaultValue={content.aboutText} />
                </div>
              </Panel>
            </div>

            <div className="col-12 col-lg-5">
              <Panel className={styles.spaced}>
                <div className={styles.sectionTitle}>Contact details</div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Address</Form.Label>
                  <Form.Control className={formStyles.control} name="address" defaultValue={content.address} />
                </div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Phone</Form.Label>
                  <Form.Control className={formStyles.control} name="phone" defaultValue={content.phone} />
                </div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Email</Form.Label>
                  <Form.Control className={formStyles.control} type="email" name="email" defaultValue={content.email} />
                </div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Opening hours</Form.Label>
                  <Form.Control className={formStyles.control} name="openingHours" defaultValue={content.openingHours} />
                </div>
                <div className={formStyles.row} style={{ marginBottom: 0 }}>
                  <Form.Label className={formStyles.label}>Instagram handle</Form.Label>
                  <Form.Control className={formStyles.control} name="instagram" defaultValue={content.instagram} />
                </div>
              </Panel>

              <Panel>
                <div className={styles.sectionTitle} style={{ marginBottom: "0.25rem" }}>Live preview</div>
                <p className={styles.previewHint}>How the hero section will look</p>
                <div className={styles.previewBox}>
                  <div className={styles.previewTitle}>{content.heroTitle}</div>
                  <div className={styles.previewSub}>{content.heroSubtitle}</div>
                  <Button variant="brew" type="button" className={styles.previewCta}>
                    {content.ctaLabel}
                  </Button>
                </div>
              </Panel>
            </div>
          </div>
        </Form>
      </Layout>
    </>
  );
}
