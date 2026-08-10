import Head from "next/head";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Form from "react-bootstrap/Form";
import Layout from "@/components_dashboard/Layout";
import Button from "@/components_dashboard/ui/Button";
import PageHeader from "@/components_dashboard/ui/PageHeader";
import Panel from "@/components_dashboard/ui/Panel";
import { useStore } from "@/lib/store";
import formStyles from "@/components_dashboard/ui/form.module.css";
import styles from "@/pages/panel-dashboard/content/content.module.css";

export default function index() {
  const siteName = useStore((s) => s.content.siteName);
  const content = useStore((s) => s.content);
  const updateContent = useStore((s) => s.updateContent);
  const hasHydrated = useStore((s) => s.hasHydrated);

  const { register, handleSubmit, reset, watch, formState: { isDirty } } = useForm({ defaultValues: content });

  useEffect(() => {
    if (hasHydrated) reset(content);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated]);

  const preview = watch();

  const onSubmit = (data) => {
    updateContent(data);
    reset(data);
    toast.success("Site content was saved.");
  };

  const handleDiscard = () => reset(content);

  return (
    <>
      <Head>
        <title>Site Content | {siteName}</title>
      </Head>
      <Layout title="Site Content" subtitle="Edit the text shown on your public website">
        <Form onSubmit={handleSubmit(onSubmit)}>
          <PageHeader title="Site Content" subtitle="Changes appear on your storefront once saved.">
            <Button variant="ghost" type="button" onClick={handleDiscard} disabled={!isDirty}>
              Discard changes
            </Button>
            <Button variant="brew" type="submit" disabled={!isDirty}>
              <i className="bi bi-check2 me-1" /> Save content
            </Button>
          </PageHeader>

          <div className="row g-3">
            <div className="col-12 col-lg-7">
              <Panel className={styles.spaced}>
                <div className={styles.sectionTitle}>Homepage hero</div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Site name</Form.Label>
                  <Form.Control className={formStyles.control} {...register("siteName")} />
                </div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Hero title</Form.Label>
                  <Form.Control className={formStyles.control} {...register("heroTitle")} />
                </div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Hero subtitle</Form.Label>
                  <Form.Control className={formStyles.control} {...register("heroSubtitle")} />
                </div>
                <div className={formStyles.row} style={{ marginBottom: 0 }}>
                  <Form.Label className={formStyles.label}>Call-to-action button label</Form.Label>
                  <Form.Control className={formStyles.control} {...register("ctaLabel")} />
                </div>
              </Panel>

              <Panel>
                <div className={styles.sectionTitle}>About section</div>
                <div className={formStyles.row} style={{ marginBottom: 0 }}>
                  <Form.Label className={formStyles.label}>About text</Form.Label>
                  <Form.Control as="textarea" rows={5} className={formStyles.control} {...register("aboutText")} />
                </div>
              </Panel>
            </div>

            <div className="col-12 col-lg-5">
              <Panel className={styles.spaced}>
                <div className={styles.sectionTitle}>Contact details</div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Address</Form.Label>
                  <Form.Control className={formStyles.control} {...register("address")} />
                </div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Phone</Form.Label>
                  <Form.Control className={formStyles.control} {...register("phone")} />
                </div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Email</Form.Label>
                  <Form.Control className={formStyles.control} type="email" {...register("email")} />
                </div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Opening hours</Form.Label>
                  <Form.Control className={formStyles.control} {...register("openingHours")} />
                </div>
                <div className={formStyles.row} style={{ marginBottom: 0 }}>
                  <Form.Label className={formStyles.label}>Instagram handle</Form.Label>
                  <Form.Control className={formStyles.control} {...register("instagram")} />
                </div>
              </Panel>

              <Panel>
                <div className={styles.sectionTitle} style={{ marginBottom: "0.25rem" }}>Live preview</div>
                <p className={styles.previewHint}>How the hero section will look</p>
                <div className={styles.previewBox}>
                  <div className={styles.previewTitle}>{preview.heroTitle || "Hero title"}</div>
                  <div className={styles.previewSub}>{preview.heroSubtitle || "Hero subtitle"}</div>
                  <Button variant="brew" type="button" className={styles.previewCta}>
                    {preview.ctaLabel || "Order Now"}
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
